interface ProductModel {
    sku: string;
    name: string;
    price: number;
}

interface CartItem {
    product: ProductModel;
    quantity: number;
}

// @singleton()
// class CartService {
//     cartServiceRandomId = Math.random();
//     selectedProducts: CartItem[] = [];
//
//     calculateTotal(): number {
//         return 1;
//     }
//
//     addToCart(): void {
//     }
// }

// @scoped(Lifecycle.ResolutionScoped)
// class ProductComponent {
//     productComponentRandomId = Math.random();
//
//     constructor(public cartService: CartService) {
//     }
// }

// function testContainer() {
//     console.log(container.resolve(ProductComponent));
// }
//
// testContainer();

// class TestCartService {
//     selectedProducts: CartItem[] = [];
//
//     calculateTotal(): number {
//         return 1;
//     }
//
//     addToCart(): void {
//     }
// }
//
// function setupTestContainer() {
//     container.register(CartService, {useClass: TestCartService});
// }
//
// setupTestContainer();
// testContainer();
