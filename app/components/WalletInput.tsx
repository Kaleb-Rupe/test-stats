// app/components/WalletInput.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isValidSolanaAddress } from "@/lib/utils/validators";
import { useToast } from "@/components/shared/Toast";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { styles } from "@/styles/utils";

export default function WalletInput() {
  const [address, setAddress] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const { showToast } = useToast();

  useEffect(() => {
    const pathSegments = pathname.split("/");
    if (pathSegments.length === 2 && pathSegments[1]) {
      setCurrentAddress(pathSegments[1]);
    }

    if (pathname.includes("/loading")) {
      setIsLoading(false);
      return;
    }

    if (pathname === "/") {
      setAddress("");
      setIsValid(null);
      setIsLoading(false);
      setCurrentAddress("");
    }
  }, [pathname]);

  const handleAddressChange = (value: string) => {
    setAddress(value);
    if (value.length > 0) {
      setIsValid(isValidSolanaAddress(value));
    } else {
      setIsValid(null);
    }
  };

  const handleSubmit = async () => {
    if (!isValid || isLoading) return;
    if (address === currentAddress) {
      showToast("This wallet is already being viewed", "info");
      return;
    }

    setIsLoading(true);
    const isOnChartsPage = pathname !== "/";
    // const targetPath = isOnChartsPage ? `/${address}` : `/${address}/loading`;

    try {
      const response = await fetch(
        `https://api.prod.flash.trade/trading-history/find-all-by-user-v2/${address}`
      );
      const data = await response.json();

      if (!response.ok || !data || data.length === 0) {
        throw new Error("This wallet has not been used on Flash Trade");
      }

      if (!isOnChartsPage) {
        router.prefetch(`/${address}`);
        router.push(`/${address}/loading`);

        fetch(
          `https://api.prod.flash.trade/trading-history/find-all-by-user-v2/${address}`
        ).catch((error) => {
          console.error("Failed to preload data:", error);
        });
      } else {
        router.push(`/${address}`);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      showToast(error.message || "Failed to fetch wallet data", "error");
      setIsLoading(false);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  };

  const handleClear = () => {
    setAddress("");
    setIsValid(null);
  };

  return (
    <div className={styles.walletInput.container}>
      <h1 className={styles.walletInput.title}>⚡ Flash Tracker</h1>

      <div className={styles.walletInput.inputWrapper}>
        <input
          type="text"
          value={address}
          onChange={(e) => handleAddressChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && isValid) {
              handleSubmit();
            }
          }}
          className={styles.walletInput.input(isValid)}
          placeholder="Enter Solana Wallet Address"
        />

        <div className={styles.walletInput.buttonContainer}>
          {!address || isValid ? (
            <button
              onClick={handleSubmit}
              disabled={!isValid || isLoading}
              style={
                isValid
                  ? {
                      background:
                        "linear-gradient(94.61deg,#fffaf3 -4.98%,#fff200 32.6%,#01e1e0 114.17%)",
                    }
                  : {}
              }
              className={styles.walletInput.button(isValid ?? false)}
            >
              {isLoading ? (
                <>
                  <span className={styles.walletInput.loadingSpinner} />
                  Loading...
                </>
              ) : (
                "Flash Me ⚡"
              )}
            </button>
          ) : (
            <button
              onClick={handleClear}
              className={styles.walletInput.clearButton}
            >
              <XMarkIcon className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
