import { CreateNewFlightScene } from "./scenes/create-product/create-flight.scene";
import { EditFlightScene } from "./scenes/edit-product/edit-flight.scene";
import { HomeScene } from "./scenes/home/home.scene";
import { LoginScene } from "./scenes/login/login.scene";
import { NotFoundScene } from "./scenes/not-found/not-found.scene";
import { OrderScene } from "./scenes/order-product/order.scene";
import { RegisterScene } from "./scenes/register/registe.scene";

export const routes = {
    public : [
        {path: '/login', scene: LoginScene},
        {path: '/register', scene: RegisterScene},
        {path: '/not-found', scene: NotFoundScene},

    ],
    private : [
        {path: '/home', scene: HomeScene},
        {path: '/addflight', scene: CreateNewFlightScene},
        {path: '/editproduct', scene: EditFlightScene},
        {path: '/order', scene: OrderScene},
    ]
}