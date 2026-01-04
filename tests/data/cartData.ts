import { describe } from "node:test";

export const cartScenarios = [
    {
        id: 'TC_CART_001',
        description: 'Verify Product Details',
        productName: 'Samsung Galaxy S25 Ultra',
        unitPrice: '₹167,558.82'
    },
    {
        id: 'TC_CART_002',
        description: 'Verify Quantity Update Math',
        initialQty: 1,
        targetQty: 2,
        expectedTotal: '₹335,117.64'
    },
    {
    id: 'TC_CART_003',
    description: 'Verify Remove Item',
    emptyMessage: 'Your cart is empty'
  },
  {
    id: 'TC_CART_004',
    description: 'Cart Persistence (Logout/Login)',
    userName: 'Persistence User'
  }
]