// Global Automatic Infaq System Core Logic
// Inspired by tembellik.py

class InfakSystem {
    constructor() {
        this.mercyIndex = 1.0;
        this.status = "Pijamalı ve Mutlu"; // Home Comfort Mode
        this.globalPool = [];
        this.nodes = [
            { id: 1, name: "Eğitim Bursu Ağı", impactScore: 85, currentNeed: 30, icon: "fa-book-open" },
            { id: 2, name: "Acil Gıda Gönüllüleri", impactScore: 95, currentNeed: 80, icon: "fa-bowl-food" },
            { id: 3, name: "Yerel Esnaf Destek", impactScore: 70, currentNeed: 20, icon: "fa-shop" },
            { id: 4, name: "Sokak Hayvanları", impactScore: 75, currentNeed: 40, icon: "fa-paw" },
            { id: 5, name: "Temiz Su Mükellefiyeti", impactScore: 90, currentNeed: 60, icon: "fa-droplet" },
            { id: 6, name: "Tıbbi Yardımlaşma", impactScore: 88, currentNeed: 50, icon: "fa-kit-medical" }
        ];

        this.autoToggle = true;
        this.resourceGenerationRate = 2000; // ms

        this.init();
    }

    init() {
        // Init UI components
        this.poolEl = document.getElementById('global-pool');
        this.nodesEl = document.getElementById('impact-nodes');
        this.consoleEl = document.getElementById('console-logs');
        this.poolCountEl = document.getElementById('pool-count');

        this.renderNodes();
        this.setupEventListeners();

        // Start the simulation loops
        setInterval(() => this.generateIdleResource(), this.resourceGenerationRate);
        setInterval(() => {
            if (this.autoToggle && this.status === "Pijamalı ve Mutlu") {
                this.distributeSurplus();
            }
        }, 3000);

        this.log("Sistem tembellik aksiyomu etrafında yapılandırıldı.", "system");
        this.setTimestamp();
    }

    setupEventListeners() {
        const mercySlider = document.getElementById('mercy-index');
        const mercyValue = document.getElementById('mercy-value');

        mercySlider.addEventListener('input', (e) => {
            this.mercyIndex = parseFloat(e.target.value);
            mercyValue.textContent = this.mercyIndex.toFixed(1);
            this.log(`Şefkat katsayısı güncellendi: ${this.mercyIndex.toFixed(1)}`, 'system');
            this.updateNodeImpacts();
        });

        const manualBtn = document.getElementById('manual-distribute-btn');
        manualBtn.addEventListener('click', () => {
            this.log("Manuel tetikleme: Denge sağlama protokolü başlatıldı.", 'system');
            this.distributeSurplus();
        });

        const autoToggleEl = document.getElementById('auto-toggle');
        autoToggleEl.addEventListener('change', (e) => {
            this.autoToggle = e.target.checked;
            this.log(`Otomatik dağıtım ${this.autoToggle ? 'açık' : 'kapalı'}.`, 'system');
        });
    }

    renderNodes() {
        this.nodesEl.innerHTML = '';

        // Sort by impact score initially
        const sortedNodes = [...this.nodes].sort((a, b) => b.impactScore - a.impactScore);

        sortedNodes.forEach(node => {
            const isHighImpact = node.impactScore > 80;
            const progress = (node.currentNeed / 100) * 100;

            const nodeDiv = document.createElement('div');
            nodeDiv.className = `impact-node ${isHighImpact ? 'high-impact' : ''}`;
            nodeDiv.id = `node-${node.id}`;
            nodeDiv.innerHTML = `
                <i class="fa-solid ${node.icon} node-icon"></i>
                <div class="node-name">${node.name}</div>
                <div class="node-needs">İhtiyaç: %${Math.max(0, 100 - node.currentNeed).toFixed(0)}</div>
                <div class="node-progress-container">
                    <div class="node-progress" style="width: ${progress}%" id="progress-${node.id}"></div>
                </div>
            `;
            this.nodesEl.appendChild(nodeDiv);
        });
    }

    updateNodeImpacts() {
        // Mercy index changes dynamically change the perceived need based on some arbitrary logic for show
        this.nodes.forEach(node => {
            const visualShift = (this.mercyIndex - 1.0) * 10;
            let newScore = node.impactScore + visualShift;
            if (newScore > 100) newScore = 100;
            if (newScore < 0) newScore = 0;

            const nodeEl = document.getElementById(`node-${node.id}`);
            if (nodeEl) {
                if (newScore > 80 && !nodeEl.classList.contains('high-impact')) {
                    nodeEl.classList.add('high-impact');
                } else if (newScore <= 80 && nodeEl.classList.contains('high-impact')) {
                    nodeEl.classList.remove('high-impact');
                }
            }
        });
    }

    generateIdleResource() {
        const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
        this.globalPool.push({ id, status: 'idle' });

        const bubble = document.createElement('div');
        bubble.className = 'resource-bubble';
        bubble.id = `res-${id}`;

        // Add random slight offsets for a scattered natural look
        const offsetX = (Math.random() - 0.5) * 10;
        const offsetY = (Math.random() - 0.5) * 10;
        bubble.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        bubble.style.animationDelay = `${Math.random() * 2}s`;

        this.poolEl.appendChild(bubble);
        this.updatePoolCount();

        if (this.globalPool.length % 5 === 0) {
            this.log(`Havuzda bekleyen enerji birikiyor... Atıl kaynak israftır.`, 'alert');
        }
    }

    updatePoolCount() {
        this.poolCountEl.textContent = `${this.globalPool.length} Atıl Kaynak`;
        if (this.globalPool.length > 0) {
            this.poolCountEl.style.color = '#fff';
            this.poolCountEl.style.background = 'rgba(234, 179, 8, 0.4)';
        } else {
            this.poolCountEl.style.color = 'var(--resource-color)';
            this.poolCountEl.style.background = 'rgba(234, 179, 8, 0.15)';
        }
    }

    findHighestImpactNode() {
        // Returns the node that has the highest need (which visually means lowest progress / highest theoretical impact)
        // Adjusting via Mercy Index
        let targetNode = null;
        let highestNeed = -1;

        this.nodes.forEach(node => {
            // "İhtiyaç" refers to how much more it needs to reach 100% full.
            // Node needs a fill logic: currently, currentNeed represents fulfillment level
            const needLevel = 100 - node.currentNeed;
            const adjustedNeed = needLevel * this.mercyIndex;

            if (adjustedNeed > highestNeed) {
                highestNeed = adjustedNeed;
                targetNode = node;
            }
        });

        return targetNode;
    }

    distributeSurplus() {
        if (this.globalPool.length === 0) return;

        // Take resources from the pool
        const availableResources = [...this.globalPool];
        this.globalPool = []; // Empty the pool to enforce tembellik (no wait)
        this.updatePoolCount();

        let distributedTo = new Set();
        let i = 0;

        const distributeInterval = setInterval(() => {
            if (i >= availableResources.length) {
                clearInterval(distributeInterval);
                this.log(`Denge sağlandı, huzur baki. Anonim aktarımlar tamamlandı.`, 'transfer');
                return;
            }

            const resource = availableResources[i];
            const destination = this.findHighestImpactNode();

            if (destination) {
                distributedTo.add(destination.name);
                this.animateTransfer(resource.id, destination.id);

                // Increase fulfillment of that node
                destination.currentNeed += (5 * this.mercyIndex);
                if (destination.currentNeed > 100) {
                    destination.currentNeed = 0; // Simulate cycles of need
                    this.log(`${destination.name} düğümü tatmin seviyesine ulaştı. Yenileniyor...`, 'system');
                }

                // Update node visual
                const progressEl = document.getElementById(`progress-${destination.id}`);
                const needsEl = document.querySelector(`#node-${destination.id} .node-needs`);
                if (progressEl && needsEl) {
                    progressEl.style.width = `${Math.min(100, destination.currentNeed)}%`;
                    needsEl.textContent = `İhtiyaç: %${Math.max(0, 100 - destination.currentNeed).toFixed(0)}`;
                }
            }

            i++;
        }, 150); // Stagger animations
    }

    animateTransfer(resourceId, targetNodeId) {
        const sourceResource = document.getElementById(`res-${resourceId}`);
        const targetNode = document.getElementById(`node-${targetNodeId}`);

        if (!sourceResource || !targetNode) return;

        // Get coordinates
        const sourceRect = sourceResource.getBoundingClientRect();
        const targetRect = targetNode.getBoundingClientRect();

        // Create an animated orb
        const orb = document.createElement('div');
        orb.className = 'resource-transferring';

        // Start position
        orb.style.left = `${sourceRect.left + sourceRect.width / 2}px`;
        orb.style.top = `${sourceRect.top + sourceRect.height / 2}px`;

        document.body.appendChild(orb);

        // Remove the original source dot
        sourceResource.remove();

        // Animate to target
        setTimeout(() => {
            orb.style.left = `${targetRect.left + targetRect.width / 2}px`;
            orb.style.top = `${targetRect.top + targetRect.height / 2}px`;
            orb.style.transform = 'scale(0.2)';
            orb.style.opacity = '0';
        }, 50);

        // Cleanup
        setTimeout(() => {
            orb.remove();

            // Pop effect on node
            targetNode.style.transform = 'scale(1.05)';
            setTimeout(() => {
                targetNode.style.transform = '';
            }, 200);

        }, 850);
    }

    log(message, type = 'system') {
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;

        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

        entry.innerHTML = `<span class="timestamp">[${timeStr}]</span> ${message}`;

        this.consoleEl.prepend(entry);

        // Keep only last 50 logs
        while (this.consoleEl.children.length > 50) {
            this.consoleEl.removeChild(this.consoleEl.lastChild);
        }
    }

    setTimestamp() {
        const timeSpans = document.querySelectorAll('.timestamp');
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        timeSpans.forEach(span => {
            if (span.innerHTML === '') span.innerHTML = `[${timeStr}]`;
        });
    }
}

// Initialize system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.system = new InfakSystem();
});
