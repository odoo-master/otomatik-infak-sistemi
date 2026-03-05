class InfakSystem:
    def __init__(self, mercy_index=1.0):
        self.mercy_index = mercy_index # Senin belirlediğin şefkat katsayısı
        self.status = "Home_Comfort_Mode"

    def distribute_surplus(self, global_pool):
        for resource in global_pool:
            if resource.is_idle():
                # Tembellik aksiyomu: Bekleyen enerji israftır, akıt gitsin!
                destination = self.find_highest_impact_node()
                resource.transfer(destination, anonymous=True)
                print("Denge sağlandı, huzur baki.")

# Denetleyici Onayı:
user_feeling = "Pijamalı ve Mutlu"
if user_feeling == "Pijamalı ve Mutlu":
    InfakSystem.run()