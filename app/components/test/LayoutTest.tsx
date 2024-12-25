"use client";

import { DashboardLayout } from "../layout/DashboardLayout";
import { Tooltip } from "../shared/Tooltip";
import { NAVIGATION } from "@/lib/constants/routes";
import { Card } from "@tremor/react";

export function LayoutTest() {
  const address = "example-address";
  const navigation = NAVIGATION(address);

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        <h1 className="text-2xl font-bold">Layout Test</h1>

        {/* Navigation Test */}
        <Card>
          <div className="p-4">
            <h2 className="text-lg font-medium mb-4">Navigation Items</h2>
            <div className="space-y-2">
              {navigation.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Tooltip Test */}
        <Card>
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-medium">Tooltip Test</h2>
            <div className="flex space-x-4">
              <Tooltip content="Top tooltip" position="top">
                <button className="px-4 py-2 bg-blue-500 rounded">
                  Hover Me (Top)
                </button>
              </Tooltip>

              <Tooltip content="Bottom tooltip" position="bottom">
                <button className="px-4 py-2 bg-blue-500 rounded">
                  Hover Me (Bottom)
                </button>
              </Tooltip>

              <Tooltip content="Left tooltip" position="left">
                <button className="px-4 py-2 bg-blue-500 rounded">
                  Hover Me (Left)
                </button>
              </Tooltip>

              <Tooltip content="Right tooltip" position="right">
                <button className="px-4 py-2 bg-blue-500 rounded">
                  Hover Me (Right)
                </button>
              </Tooltip>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
