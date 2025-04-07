// next-auth.d.ts
import "next-auth";

declare module "next-auth" {
    /**
     * Interface User étendue avec UserI
     */
    // interface User extends UserI {
    //     // Vous pouvez ajouter des membres supplémentaires ici si nécessaire
    // }

    /**
     * Interface Session étendue pour inclure l'utilisateur personnalisé
     */
    interface Session {
        user: UserI; // Utiliser l'interface User étendue
    }
}
