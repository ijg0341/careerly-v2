'use client';

import { toast } from 'sonner';
import { TabNav } from '@/components/design-guide/TabNav';

export default function ColorsPage() {
  const copyToClipboard = (className: string) => {
    navigator.clipboard.writeText(className);
    toast.success(`Copied: ${className}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <TabNav />

        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-slate-900">Colors</h2>

          {/* Basic Colors */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Basic</h3>
            <div className="flex gap-4">
              <div
                className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => copyToClipboard('bg-white')}
              >
                <div className="w-24 h-24 rounded-xl bg-white border-2 border-slate-200" />
                <p className="text-sm font-medium text-slate-700 text-center">white</p>
              </div>
              <div
                className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => copyToClipboard('bg-black')}
              >
                <div className="w-24 h-24 rounded-xl bg-black" />
                <p className="text-sm font-medium text-slate-700 text-center">black</p>
              </div>
            </div>
          </div>

          {/* Slate */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Slate</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-slate-50')}>
                <div className="w-full h-24 rounded-xl bg-slate-50" />
                <p className="text-sm font-medium text-slate-700 text-center">50</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-slate-100')}>
                <div className="w-full h-24 rounded-xl bg-slate-100" />
                <p className="text-sm font-medium text-slate-700 text-center">100</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-slate-200')}>
                <div className="w-full h-24 rounded-xl bg-slate-200" />
                <p className="text-sm font-medium text-slate-700 text-center">200</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-slate-300')}>
                <div className="w-full h-24 rounded-xl bg-slate-300" />
                <p className="text-sm font-medium text-slate-700 text-center">300</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-slate-400')}>
                <div className="w-full h-24 rounded-xl bg-slate-400" />
                <p className="text-sm font-medium text-slate-700 text-center">400</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-slate-500')}>
                <div className="w-full h-24 rounded-xl bg-slate-500" />
                <p className="text-sm font-medium text-slate-700 text-center">500</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-slate-600')}>
                <div className="w-full h-24 rounded-xl bg-slate-600" />
                <p className="text-sm font-medium text-slate-700 text-center">600</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-slate-700')}>
                <div className="w-full h-24 rounded-xl bg-slate-700" />
                <p className="text-sm font-medium text-slate-700 text-center">700</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-slate-800')}>
                <div className="w-full h-24 rounded-xl bg-slate-800" />
                <p className="text-sm font-medium text-slate-700 text-center">800</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-slate-900')}>
                <div className="w-full h-24 rounded-xl bg-slate-900" />
                <p className="text-sm font-medium text-slate-700 text-center">900</p>
              </div>
            </div>
          </div>

          {/* Gray */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Gray</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-gray-50')}>
                <div className="w-full h-24 rounded-xl bg-gray-50" />
                <p className="text-sm font-medium text-slate-700 text-center">50</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-gray-100')}>
                <div className="w-full h-24 rounded-xl bg-gray-100" />
                <p className="text-sm font-medium text-slate-700 text-center">100</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-gray-200')}>
                <div className="w-full h-24 rounded-xl bg-gray-200" />
                <p className="text-sm font-medium text-slate-700 text-center">200</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-gray-300')}>
                <div className="w-full h-24 rounded-xl bg-gray-300" />
                <p className="text-sm font-medium text-slate-700 text-center">300</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-gray-400')}>
                <div className="w-full h-24 rounded-xl bg-gray-400" />
                <p className="text-sm font-medium text-slate-700 text-center">400</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-gray-500')}>
                <div className="w-full h-24 rounded-xl bg-gray-500" />
                <p className="text-sm font-medium text-slate-700 text-center">500</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-gray-600')}>
                <div className="w-full h-24 rounded-xl bg-gray-600" />
                <p className="text-sm font-medium text-slate-700 text-center">600</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-gray-700')}>
                <div className="w-full h-24 rounded-xl bg-gray-700" />
                <p className="text-sm font-medium text-slate-700 text-center">700</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-gray-800')}>
                <div className="w-full h-24 rounded-xl bg-gray-800" />
                <p className="text-sm font-medium text-slate-700 text-center">800</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-gray-900')}>
                <div className="w-full h-24 rounded-xl bg-gray-900" />
                <p className="text-sm font-medium text-slate-700 text-center">900</p>
              </div>
            </div>
          </div>

          {/* Red */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Red</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-red-50')}>
                <div className="w-full h-24 rounded-xl bg-red-50" />
                <p className="text-sm font-medium text-slate-700 text-center">50</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-red-100')}>
                <div className="w-full h-24 rounded-xl bg-red-100" />
                <p className="text-sm font-medium text-slate-700 text-center">100</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-red-200')}>
                <div className="w-full h-24 rounded-xl bg-red-200" />
                <p className="text-sm font-medium text-slate-700 text-center">200</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-red-300')}>
                <div className="w-full h-24 rounded-xl bg-red-300" />
                <p className="text-sm font-medium text-slate-700 text-center">300</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-red-400')}>
                <div className="w-full h-24 rounded-xl bg-red-400" />
                <p className="text-sm font-medium text-slate-700 text-center">400</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-red-500')}>
                <div className="w-full h-24 rounded-xl bg-red-500" />
                <p className="text-sm font-medium text-slate-700 text-center">500</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-red-600')}>
                <div className="w-full h-24 rounded-xl bg-red-600" />
                <p className="text-sm font-medium text-slate-700 text-center">600</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-red-700')}>
                <div className="w-full h-24 rounded-xl bg-red-700" />
                <p className="text-sm font-medium text-slate-700 text-center">700</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-red-800')}>
                <div className="w-full h-24 rounded-xl bg-red-800" />
                <p className="text-sm font-medium text-slate-700 text-center">800</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-red-900')}>
                <div className="w-full h-24 rounded-xl bg-red-900" />
                <p className="text-sm font-medium text-slate-700 text-center">900</p>
              </div>
            </div>
          </div>

          {/* Yellow */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Yellow</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-yellow-50')}>
                <div className="w-full h-24 rounded-xl bg-yellow-50" />
                <p className="text-sm font-medium text-slate-700 text-center">50</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-yellow-100')}>
                <div className="w-full h-24 rounded-xl bg-yellow-100" />
                <p className="text-sm font-medium text-slate-700 text-center">100</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-yellow-200')}>
                <div className="w-full h-24 rounded-xl bg-yellow-200" />
                <p className="text-sm font-medium text-slate-700 text-center">200</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-yellow-300')}>
                <div className="w-full h-24 rounded-xl bg-yellow-300" />
                <p className="text-sm font-medium text-slate-700 text-center">300</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-yellow-400')}>
                <div className="w-full h-24 rounded-xl bg-yellow-400" />
                <p className="text-sm font-medium text-slate-700 text-center">400</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-yellow-500')}>
                <div className="w-full h-24 rounded-xl bg-yellow-500" />
                <p className="text-sm font-medium text-slate-700 text-center">500</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-yellow-600')}>
                <div className="w-full h-24 rounded-xl bg-yellow-600" />
                <p className="text-sm font-medium text-slate-700 text-center">600</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-yellow-700')}>
                <div className="w-full h-24 rounded-xl bg-yellow-700" />
                <p className="text-sm font-medium text-slate-700 text-center">700</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-yellow-800')}>
                <div className="w-full h-24 rounded-xl bg-yellow-800" />
                <p className="text-sm font-medium text-slate-700 text-center">800</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-yellow-900')}>
                <div className="w-full h-24 rounded-xl bg-yellow-900" />
                <p className="text-sm font-medium text-slate-700 text-center">900</p>
              </div>
            </div>
          </div>

          {/* Green */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Green</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-green-50')}>
                <div className="w-full h-24 rounded-xl bg-green-50" />
                <p className="text-sm font-medium text-slate-700 text-center">50</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-green-100')}>
                <div className="w-full h-24 rounded-xl bg-green-100" />
                <p className="text-sm font-medium text-slate-700 text-center">100</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-green-200')}>
                <div className="w-full h-24 rounded-xl bg-green-200" />
                <p className="text-sm font-medium text-slate-700 text-center">200</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-green-300')}>
                <div className="w-full h-24 rounded-xl bg-green-300" />
                <p className="text-sm font-medium text-slate-700 text-center">300</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-green-400')}>
                <div className="w-full h-24 rounded-xl bg-green-400" />
                <p className="text-sm font-medium text-slate-700 text-center">400</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-green-500')}>
                <div className="w-full h-24 rounded-xl bg-green-500" />
                <p className="text-sm font-medium text-slate-700 text-center">500</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-green-600')}>
                <div className="w-full h-24 rounded-xl bg-green-600" />
                <p className="text-sm font-medium text-slate-700 text-center">600</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-green-700')}>
                <div className="w-full h-24 rounded-xl bg-green-700" />
                <p className="text-sm font-medium text-slate-700 text-center">700</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-green-800')}>
                <div className="w-full h-24 rounded-xl bg-green-800" />
                <p className="text-sm font-medium text-slate-700 text-center">800</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-green-900')}>
                <div className="w-full h-24 rounded-xl bg-green-900" />
                <p className="text-sm font-medium text-slate-700 text-center">900</p>
              </div>
            </div>
          </div>

          {/* Teal */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Teal</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-teal-50')}>
                <div className="w-full h-24 rounded-xl bg-teal-50" />
                <p className="text-sm font-medium text-slate-700 text-center">50</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-teal-100')}>
                <div className="w-full h-24 rounded-xl bg-teal-100" />
                <p className="text-sm font-medium text-slate-700 text-center">100</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-teal-200')}>
                <div className="w-full h-24 rounded-xl bg-teal-200" />
                <p className="text-sm font-medium text-slate-700 text-center">200</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-teal-300')}>
                <div className="w-full h-24 rounded-xl bg-teal-300" />
                <p className="text-sm font-medium text-slate-700 text-center">300</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-teal-400')}>
                <div className="w-full h-24 rounded-xl bg-teal-400" />
                <p className="text-sm font-medium text-slate-700 text-center">400</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-teal-500')}>
                <div className="w-full h-24 rounded-xl bg-teal-500" />
                <p className="text-sm font-medium text-slate-700 text-center">500</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-teal-600')}>
                <div className="w-full h-24 rounded-xl bg-teal-600" />
                <p className="text-sm font-medium text-slate-700 text-center">600</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-teal-700')}>
                <div className="w-full h-24 rounded-xl bg-teal-700" />
                <p className="text-sm font-medium text-slate-700 text-center">700</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-teal-800')}>
                <div className="w-full h-24 rounded-xl bg-teal-800" />
                <p className="text-sm font-medium text-slate-700 text-center">800</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-teal-900')}>
                <div className="w-full h-24 rounded-xl bg-teal-900" />
                <p className="text-sm font-medium text-slate-700 text-center">900</p>
              </div>
            </div>
          </div>

          {/* Blue */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Blue</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-blue-50')}>
                <div className="w-full h-24 rounded-xl bg-blue-50" />
                <p className="text-sm font-medium text-slate-700 text-center">50</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-blue-100')}>
                <div className="w-full h-24 rounded-xl bg-blue-100" />
                <p className="text-sm font-medium text-slate-700 text-center">100</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-blue-200')}>
                <div className="w-full h-24 rounded-xl bg-blue-200" />
                <p className="text-sm font-medium text-slate-700 text-center">200</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-blue-300')}>
                <div className="w-full h-24 rounded-xl bg-blue-300" />
                <p className="text-sm font-medium text-slate-700 text-center">300</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-blue-400')}>
                <div className="w-full h-24 rounded-xl bg-blue-400" />
                <p className="text-sm font-medium text-slate-700 text-center">400</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-blue-500')}>
                <div className="w-full h-24 rounded-xl bg-blue-500" />
                <p className="text-sm font-medium text-slate-700 text-center">500</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-blue-600')}>
                <div className="w-full h-24 rounded-xl bg-blue-600" />
                <p className="text-sm font-medium text-slate-700 text-center">600</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-blue-700')}>
                <div className="w-full h-24 rounded-xl bg-blue-700" />
                <p className="text-sm font-medium text-slate-700 text-center">700</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-blue-800')}>
                <div className="w-full h-24 rounded-xl bg-blue-800" />
                <p className="text-sm font-medium text-slate-700 text-center">800</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-blue-900')}>
                <div className="w-full h-24 rounded-xl bg-blue-900" />
                <p className="text-sm font-medium text-slate-700 text-center">900</p>
              </div>
            </div>
          </div>

          {/* Indigo */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Indigo</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-indigo-50')}>
                <div className="w-full h-24 rounded-xl bg-indigo-50" />
                <p className="text-sm font-medium text-slate-700 text-center">50</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-indigo-100')}>
                <div className="w-full h-24 rounded-xl bg-indigo-100" />
                <p className="text-sm font-medium text-slate-700 text-center">100</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-indigo-200')}>
                <div className="w-full h-24 rounded-xl bg-indigo-200" />
                <p className="text-sm font-medium text-slate-700 text-center">200</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-indigo-300')}>
                <div className="w-full h-24 rounded-xl bg-indigo-300" />
                <p className="text-sm font-medium text-slate-700 text-center">300</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-indigo-400')}>
                <div className="w-full h-24 rounded-xl bg-indigo-400" />
                <p className="text-sm font-medium text-slate-700 text-center">400</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-indigo-500')}>
                <div className="w-full h-24 rounded-xl bg-indigo-500" />
                <p className="text-sm font-medium text-slate-700 text-center">500</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-indigo-600')}>
                <div className="w-full h-24 rounded-xl bg-indigo-600" />
                <p className="text-sm font-medium text-slate-700 text-center">600</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-indigo-700')}>
                <div className="w-full h-24 rounded-xl bg-indigo-700" />
                <p className="text-sm font-medium text-slate-700 text-center">700</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-indigo-800')}>
                <div className="w-full h-24 rounded-xl bg-indigo-800" />
                <p className="text-sm font-medium text-slate-700 text-center">800</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-indigo-900')}>
                <div className="w-full h-24 rounded-xl bg-indigo-900" />
                <p className="text-sm font-medium text-slate-700 text-center">900</p>
              </div>
            </div>
          </div>

          {/* Purple */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Purple</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-purple-50')}>
                <div className="w-full h-24 rounded-xl bg-purple-50" />
                <p className="text-sm font-medium text-slate-700 text-center">50</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-purple-100')}>
                <div className="w-full h-24 rounded-xl bg-purple-100" />
                <p className="text-sm font-medium text-slate-700 text-center">100</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-purple-200')}>
                <div className="w-full h-24 rounded-xl bg-purple-200" />
                <p className="text-sm font-medium text-slate-700 text-center">200</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-purple-300')}>
                <div className="w-full h-24 rounded-xl bg-purple-300" />
                <p className="text-sm font-medium text-slate-700 text-center">300</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-purple-400')}>
                <div className="w-full h-24 rounded-xl bg-purple-400" />
                <p className="text-sm font-medium text-slate-700 text-center">400</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-purple-500')}>
                <div className="w-full h-24 rounded-xl bg-purple-500" />
                <p className="text-sm font-medium text-slate-700 text-center">500</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-purple-600')}>
                <div className="w-full h-24 rounded-xl bg-purple-600" />
                <p className="text-sm font-medium text-slate-700 text-center">600</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-purple-700')}>
                <div className="w-full h-24 rounded-xl bg-purple-700" />
                <p className="text-sm font-medium text-slate-700 text-center">700</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-purple-800')}>
                <div className="w-full h-24 rounded-xl bg-purple-800" />
                <p className="text-sm font-medium text-slate-700 text-center">800</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-purple-900')}>
                <div className="w-full h-24 rounded-xl bg-purple-900" />
                <p className="text-sm font-medium text-slate-700 text-center">900</p>
              </div>
            </div>
          </div>

          {/* Fuchsia */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Fuchsia</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-fuchsia-50')}>
                <div className="w-full h-24 rounded-xl bg-fuchsia-50" />
                <p className="text-sm font-medium text-slate-700 text-center">50</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-fuchsia-100')}>
                <div className="w-full h-24 rounded-xl bg-fuchsia-100" />
                <p className="text-sm font-medium text-slate-700 text-center">100</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-fuchsia-200')}>
                <div className="w-full h-24 rounded-xl bg-fuchsia-200" />
                <p className="text-sm font-medium text-slate-700 text-center">200</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-fuchsia-300')}>
                <div className="w-full h-24 rounded-xl bg-fuchsia-300" />
                <p className="text-sm font-medium text-slate-700 text-center">300</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-fuchsia-400')}>
                <div className="w-full h-24 rounded-xl bg-fuchsia-400" />
                <p className="text-sm font-medium text-slate-700 text-center">400</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-fuchsia-500')}>
                <div className="w-full h-24 rounded-xl bg-fuchsia-500" />
                <p className="text-sm font-medium text-slate-700 text-center">500</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-fuchsia-600')}>
                <div className="w-full h-24 rounded-xl bg-fuchsia-600" />
                <p className="text-sm font-medium text-slate-700 text-center">600</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-fuchsia-700')}>
                <div className="w-full h-24 rounded-xl bg-fuchsia-700" />
                <p className="text-sm font-medium text-slate-700 text-center">700</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-fuchsia-800')}>
                <div className="w-full h-24 rounded-xl bg-fuchsia-800" />
                <p className="text-sm font-medium text-slate-700 text-center">800</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-fuchsia-900')}>
                <div className="w-full h-24 rounded-xl bg-fuchsia-900" />
                <p className="text-sm font-medium text-slate-700 text-center">900</p>
              </div>
            </div>
          </div>

          {/* Coral */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Coral</h3>
            <div className="flex gap-3">
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-coral-100')}>
                <div className="w-32 h-24 rounded-xl bg-coral-100" />
                <p className="text-sm font-medium text-slate-700 text-center">100</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-coral-400')}>
                <div className="w-32 h-24 rounded-xl bg-coral-400" />
                <p className="text-sm font-medium text-slate-700 text-center">400</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-coral-500')}>
                <div className="w-32 h-24 rounded-xl bg-coral-500" />
                <p className="text-sm font-medium text-slate-700 text-center">500</p>
              </div>
              <div className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard('bg-coral-600')}>
                <div className="w-32 h-24 rounded-xl bg-coral-600" />
                <p className="text-sm font-medium text-slate-700 text-center">600</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
