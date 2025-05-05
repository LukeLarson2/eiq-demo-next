"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingCart,
  RefreshCcw,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useCart } from "@/lib/cart-context";
import { ExemptionIqClient } from "exemption-iq";

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal } =
    useCart();
  const [promoCode, setPromoCode] = useState("");
  const [exemptionComplete, setExemptionComplete] = useState(false);

  const customerInfo = {
    name: "Acme Corporation",
    emailAddress: "purchasing@acmecorp.example",
    addressLine1: "123 Business Ave",
    phoneNumber: "555-123-4567",
    city: "Orlando",
    country: "USA",
    postalCode: "32801",
    region: "FL",
  };

  const handleExemptionComplete = (status: boolean) => {
    setExemptionComplete(status);
    return true;
  };

  const handleCheckout = () => {
    // In a real application, this would navigate to a checkout page
    // or initiate the checkout process
    router.push("/checkout");
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = exemptionComplete ? 0 : subtotal * 0.07; // Example tax rate of 7%
  const total = subtotal + shipping + tax;

  const buttonStyles = JSON.stringify({
    padding: "0.75rem 1.5rem",
    borderRadius: "6px",
    fontWeight: 500,
    fontSize: "0.875rem",
    transition: "background-color 150ms ease-in-out, opacity 150ms ease-in-out",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    backgroundColor: "#1f2937", // Tailwind's gray-800
    color: "#ffffff",
    cursor: "pointer",
    width: "100%",
  });

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <ShoppingCart className="h-16 w-16 mx-auto mb-6 text-gray-400" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link href="/products">
            <Button className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/cart" className="text-muted-foreground">
              Shopping Cart
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold tracking-tight mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm border">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  {cart.length} {cart.length === 1 ? "Item" : "Items"}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-gray-500 hover:text-destructive"
                >
                  Clear Cart
                </Button>
              </div>

              <div className="space-y-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <div className="w-full sm:w-24 h-24 relative rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    <div className="flex-1">
                      <Link href={`/products/${item.id}`}>
                        <h3 className="font-medium hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                      </Link>

                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        ${item.price.toFixed(2)}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-4">
                        <div className="flex items-center border border-gray-200 dark:border-gray-800 rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="h-8 w-8 rounded-r-none"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>

                          <div className="h-8 w-10 flex items-center justify-center border-x border-gray-200 dark:border-gray-800 text-sm">
                            {item.quantity}
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            disabled={item.stock <= item.quantity}
                            className="h-8 w-8 rounded-l-none"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <p className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-destructive p-0 h-auto"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800 p-6 bg-gray-50 dark:bg-gray-900 rounded-b-lg">
              <div className="flex justify-between items-center">
                <Link
                  href="/products"
                  className="text-primary hover:text-primary/80 flex items-center gap-2"
                >
                  <ChevronRight className="h-4 w-4 rotate-180" />
                  Continue Shopping
                </Link>

                <div className="flex items-center gap-2">
                  <RefreshCcw className="h-4 w-4" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Free shipping on orders over $50
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm border p-6 sticky top-20">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Subtotal
                </span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Shipping
                </span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-green-600 dark:text-green-400">
                      Free
                    </span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Tax (${exemptionComplete ? "0%" : "7%"})
                </span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <Separator className="my-3" />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline">Apply</Button>
                </div>

                <ExemptionIqClient
                  customerCode="ACME001"
                  customerInfo={customerInfo}
                  state="Florida"
                  primaryColor="#2966B1"
                  onComplete={handleExemptionComplete}
                  framework="next"
                  buttonStyles={buttonStyles}
                  manualValidation={false}
                  showDownload={true}
                />

                <Button className="w-full" onClick={handleCheckout}>
                  Checkout
                </Button>
              </div>

              <div className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                Secure checkout powered by Stripe
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
