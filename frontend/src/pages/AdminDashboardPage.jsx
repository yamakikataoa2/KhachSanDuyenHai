import React from 'react';

export default function AdminDashboardPage() {
  return (
    <div className="bg-background text-on-surface min-h-screen overflow-x-hidden">
      
{/*  SideNavBar (Admin)  */}
<aside className="h-screen w-64 fixed left-0 top-0 bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full py-6 z-50">
<div className="px-6 mb-8">
<h1 className="text-lg font-bold text-slate-900 dark:text-slate-50">Admin Portal</h1>
<p className="text-xs text-slate-500 font-medium tracking-tight">Sanctuary Management</p>
</div>
<nav className="flex-1 space-y-1">
<a className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 mx-2 my-1 px-4 py-3 rounded-lg flex items-center gap-3 transition-all font-medium text-sm" href="#">
<span className="material-symbols-outlined text-xl">dashboard</span> Dashboard
            </a>
<a className="bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 rounded-lg mx-2 my-1 px-4 py-3 border-l-4 border-amber-700 flex items-center gap-3 font-medium text-sm translate-x-1 transition-transform duration-150" href="#">
<span className="material-symbols-outlined text-xl">bed</span> Rooms
            </a>
<a className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 mx-2 my-1 px-4 py-3 rounded-lg flex items-center gap-3 transition-all font-medium text-sm" href="#">
<span className="material-symbols-outlined text-xl">room_service</span> Services
            </a>
<a className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 mx-2 my-1 px-4 py-3 rounded-lg flex items-center gap-3 transition-all font-medium text-sm" href="#">
<span className="material-symbols-outlined text-xl">package_2</span> Combo Packages
            </a>
<a className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 mx-2 my-1 px-4 py-3 rounded-lg flex items-center gap-3 transition-all font-medium text-sm" href="#">
<span className="material-symbols-outlined text-xl">group</span> Customers
            </a>
<a className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 mx-2 my-1 px-4 py-3 rounded-lg flex items-center gap-3 transition-all font-medium text-sm" href="#">
<span className="material-symbols-outlined text-xl">calendar_month</span> Bookings
            </a>
<a className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 mx-2 my-1 px-4 py-3 rounded-lg flex items-center gap-3 transition-all font-medium text-sm" href="#">
<span className="material-symbols-outlined text-xl">receipt_long</span> Invoices
            </a>
<a className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 mx-2 my-1 px-4 py-3 rounded-lg flex items-center gap-3 transition-all font-medium text-sm" href="#">
<span className="material-symbols-outlined text-xl">badge</span> Staff
            </a>
<a className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 mx-2 my-1 px-4 py-3 rounded-lg flex items-center gap-3 transition-all font-medium text-sm" href="#">
<span className="material-symbols-outlined text-xl">query_stats</span> Statistics
            </a>
</nav>
<div className="px-4 mt-auto">
<div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl">
<img alt="Admin Profile" className="w-10 h-10 rounded-full object-cover shadow-sm" data-alt="professional headshot of a boutique hotel manager in a stylish charcoal suit with warm lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBS3YasCEvQXkgK5VPqSpXE8zpjpkzorC-xldUc84dy-XKU5QS1fDy8gFoXRFdPPVPlf4vqfm--VbgmLU7P_TCna-e74FKcqf28HPoPWp2Pq3qZaRZFBBdrjaON4lbG-MNbo9IoH-V5-9Bk8dqFb9Mbycjd3XODHJd999DH89hUvXIVSslK1r-x91h-WpIbqO6HF6AJieglbgghoBhS3QTYeqJCK_0Acna5m4Pu07E29FMvVhKhVJnfDBubUbjaIPyGOCZASWOVWvA"/>
<div className="overflow-hidden">
<p className="text-sm font-bold truncate">Administrator</p>
<p className="text-[10px] uppercase tracking-wider text-slate-500">Super Admin</p>
</div>
</div>
</div>
</aside>
{/*  Main Content Shell  */}
<main className="ml-64 min-h-screen">
{/*  TopNavBar (Admin)  */}
<header className="w-full sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center px-6 py-3">
<div className="flex items-center gap-4 w-1/2">
<div className="relative w-full max-w-md">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
<input className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-full text-sm focus:ring-2 focus:ring-amber-200 transition-all outline-none" placeholder="Search rooms, bookings..." type="text"/>
</div>
</div>
<div className="flex items-center gap-2">
<button className="hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded-full transition-all text-slate-600">
<span className="material-symbols-outlined">notifications</span>
</button>
<button className="hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded-full transition-all text-slate-600">
<span className="material-symbols-outlined">settings</span>
</button>
</div>
</header>
<div className="p-8 max-w-7xl mx-auto space-y-8">
{/*  Dashboard Header Section  */}
<div className="flex justify-between items-end">
<div>
<h2 className="text-3xl font-notoSerif text-slate-900 mb-1">Room Management</h2>
<p className="text-slate-500 text-sm">Monitor, manage, and optimize your sanctuary's inventory.</p>
</div>
<button className="bg-primary-container text-on-primary-container px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg shadow-primary-container/20 hover:scale-105 transition-transform">
<span className="material-symbols-outlined">add</span>
                    Thêm phòng mới
                </button>
</div>
{/*  Stats Bento Grid  */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
<div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_20px_40px_rgba(77,70,53,0.06)] border border-transparent flex items-start justify-between group hover:border-amber-100 transition-colors">
<div>
<p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Total Rooms</p>
<h3 className="text-2xl font-bold text-slate-900">124</h3>
<p className="text-xs text-green-600 mt-2 font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-sm">trending_up</span> +2 this month
                        </p>
</div>
<div className="p-3 bg-amber-50 rounded-lg text-amber-700">
<span className="material-symbols-outlined">hotel</span>
</div>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_20px_40px_rgba(77,70,53,0.06)] border border-transparent flex items-start justify-between group hover:border-blue-100 transition-colors">
<div>
<p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Occupied</p>
<h3 className="text-2xl font-bold text-slate-900">92</h3>
<div className="w-24 bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
<div className="bg-blue-500 h-full w-[74%]"></div>
</div>
</div>
<div className="p-3 bg-blue-50 rounded-lg text-blue-700">
<span className="material-symbols-outlined">person_check</span>
</div>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_20px_40px_rgba(77,70,53,0.06)] border border-transparent flex items-start justify-between group hover:border-orange-100 transition-colors">
<div>
<p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Maintenance</p>
<h3 className="text-2xl font-bold text-slate-900">6</h3>
<p className="text-xs text-orange-600 mt-2 font-medium">Scheduled: 2 today</p>
</div>
<div className="p-3 bg-orange-50 rounded-lg text-orange-700">
<span className="material-symbols-outlined">engineering</span>
</div>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_20px_40px_rgba(77,70,53,0.06)] border border-transparent flex items-start justify-between group hover:border-primary-container transition-colors">
<div>
<p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Revenue Today</p>
<h3 className="text-2xl font-bold text-slate-900">$12,450</h3>
<p className="text-xs text-green-600 mt-2 font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-sm">arrow_upward</span> 12% vs last week
                        </p>
</div>
<div className="p-3 bg-primary-container/10 rounded-lg text-primary">
<span className="material-symbols-outlined">payments</span>
</div>
</div>
</div>
{/*  Filters & Actions Area  */}
<div className="flex flex-wrap items-center justify-between gap-4 bg-surface-container-low p-4 rounded-xl">
<div className="flex items-center gap-3">
<div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-slate-100 shadow-sm">
<span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Floor</span>
<select className="border-none bg-transparent text-sm font-medium focus:ring-0 p-0 pr-8">
<option>All Floors</option>
<option>Floor 1</option>
<option>Floor 2</option>
<option>Floor 3</option>
<option>Penthouse</option>
</select>
</div>
<div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-slate-100 shadow-sm">
<span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Status</span>
<select className="border-none bg-transparent text-sm font-medium focus:ring-0 p-0 pr-8">
<option>All Statuses</option>
<option>Ready</option>
<option>Occupied</option>
<option>Cleaning</option>
<option>Maintenance</option>
</select>
</div>
</div>
<div className="flex items-center gap-2">
<button className="p-2 hover:bg-white rounded-lg text-slate-600 transition-all border border-transparent hover:border-slate-100">
<span className="material-symbols-outlined">filter_list</span>
</button>
<button className="p-2 hover:bg-white rounded-lg text-slate-600 transition-all border border-transparent hover:border-slate-100">
<span className="material-symbols-outlined">download</span>
</button>
</div>
</div>
{/*  Room Management Table  */}
<div className="bg-surface-container-lowest rounded-xl shadow-[0_20px_40px_rgba(77,70,53,0.06)] overflow-hidden">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low">
<th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Room Number</th>
<th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Type</th>
<th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Floor</th>
<th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Status</th>
<th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Price</th>
<th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-slate-50">
{/*  Room Row 1  */}
<tr className="hover:bg-slate-50/50 transition-colors group">
<td className="px-6 py-5 font-bold text-slate-900">101</td>
<td className="px-6 py-5 text-sm text-slate-600">Deluxe Garden View</td>
<td className="px-6 py-5 text-sm text-slate-500">Floor 1</td>
<td className="px-6 py-5">
<span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-green-100 text-green-700">Ready</span>
</td>
<td className="px-6 py-5 font-medium text-slate-900">$250/night</td>
<td className="px-6 py-5 text-right">
<div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-1.5 hover:text-amber-700"><span className="material-symbols-outlined text-lg">visibility</span></button>
<button className="p-1.5 hover:text-blue-700"><span className="material-symbols-outlined text-lg">edit</span></button>
<button className="p-1.5 hover:text-error"><span className="material-symbols-outlined text-lg">delete</span></button>
</div>
</td>
</tr>
{/*  Room Row 2  */}
<tr className="hover:bg-slate-50/50 transition-colors group">
<td className="px-6 py-5 font-bold text-slate-900">102</td>
<td className="px-6 py-5 text-sm text-slate-600">Premium Suite</td>
<td className="px-6 py-5 text-sm text-slate-500">Floor 1</td>
<td className="px-6 py-5">
<span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-blue-100 text-blue-700">Occupied</span>
</td>
<td className="px-6 py-5 font-medium text-slate-900">$480/night</td>
<td className="px-6 py-5 text-right">
<div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-1.5 hover:text-amber-700"><span className="material-symbols-outlined text-lg">visibility</span></button>
<button className="p-1.5 hover:text-blue-700"><span className="material-symbols-outlined text-lg">edit</span></button>
<button className="p-1.5 hover:text-error"><span className="material-symbols-outlined text-lg">delete</span></button>
</div>
</td>
</tr>
{/*  Room Row 3  */}
<tr className="hover:bg-slate-50/50 transition-colors group">
<td className="px-6 py-5 font-bold text-slate-900">204</td>
<td className="px-6 py-5 text-sm text-slate-600">Standard Twin</td>
<td className="px-6 py-5 text-sm text-slate-500">Floor 2</td>
<td className="px-6 py-5">
<span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-amber-100 text-amber-700">Cleaning</span>
</td>
<td className="px-6 py-5 font-medium text-slate-900">$180/night</td>
<td className="px-6 py-5 text-right">
<div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-1.5 hover:text-amber-700"><span className="material-symbols-outlined text-lg">visibility</span></button>
<button className="p-1.5 hover:text-blue-700"><span className="material-symbols-outlined text-lg">edit</span></button>
<button className="p-1.5 hover:text-error"><span className="material-symbols-outlined text-lg">delete</span></button>
</div>
</td>
</tr>
{/*  Room Row 4  */}
<tr className="hover:bg-slate-50/50 transition-colors group">
<td className="px-6 py-5 font-bold text-slate-900">305</td>
<td className="px-6 py-5 text-sm text-slate-600">Executive Penthouse</td>
<td className="px-6 py-5 text-sm text-slate-500">Floor 3</td>
<td className="px-6 py-5">
<span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-red-100 text-red-700">Maintenance</span>
</td>
<td className="px-6 py-5 font-medium text-slate-900">$950/night</td>
<td className="px-6 py-5 text-right">
<div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-1.5 hover:text-amber-700"><span className="material-symbols-outlined text-lg">visibility</span></button>
<button className="p-1.5 hover:text-blue-700"><span className="material-symbols-outlined text-lg">edit</span></button>
<button className="p-1.5 hover:text-error"><span className="material-symbols-outlined text-lg">delete</span></button>
</div>
</td>
</tr>
{/*  Room Row 5  */}
<tr className="hover:bg-slate-50/50 transition-colors group">
<td className="px-6 py-5 font-bold text-slate-900">104</td>
<td className="px-6 py-5 text-sm text-slate-600">Deluxe Ocean View</td>
<td className="px-6 py-5 text-sm text-slate-500">Floor 1</td>
<td className="px-6 py-5">
<span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-green-100 text-green-700">Ready</span>
</td>
<td className="px-6 py-5 font-medium text-slate-900">$290/night</td>
<td className="px-6 py-5 text-right">
<div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-1.5 hover:text-amber-700"><span className="material-symbols-outlined text-lg">visibility</span></button>
<button className="p-1.5 hover:text-blue-700"><span className="material-symbols-outlined text-lg">edit</span></button>
<button className="p-1.5 hover:text-error"><span className="material-symbols-outlined text-lg">delete</span></button>
</div>
</td>
</tr>
</tbody>
</table>
{/*  Pagination  */}
<div className="px-6 py-4 bg-surface-container-low flex items-center justify-between">
<p className="text-xs text-slate-500 font-medium">Showing 1 to 5 of 124 rooms</p>
<div className="flex items-center gap-2">
<button className="p-2 hover:bg-white rounded-lg text-slate-400 disabled:opacity-50" disabled="">
<span className="material-symbols-outlined">chevron_left</span>
</button>
<button className="px-3 py-1 bg-primary text-on-primary rounded-md text-xs font-bold">1</button>
<button className="px-3 py-1 hover:bg-white text-slate-600 rounded-md text-xs font-bold">2</button>
<button className="px-3 py-1 hover:bg-white text-slate-600 rounded-md text-xs font-bold">3</button>
<button className="p-2 hover:bg-white rounded-lg text-slate-400">
<span className="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>
</div>
{/*  Bottom Note  */}
<footer className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between text-slate-400 text-[10px] uppercase tracking-widest font-semibold">
<span>© 2024 The Curated Sanctuary Management System</span>
<div className="flex gap-6 mt-4 md:mt-0">
<a className="hover:text-amber-700" href="#">Support Center</a>
<a className="hover:text-amber-700" href="#">System Logs</a>
<a className="hover:text-amber-700" href="#">Privacy Policy</a>
</div>
</footer>
</div>
</main>

    </div>
  );
}
