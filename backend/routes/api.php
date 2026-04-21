<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RoomTypeController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ComboController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\StaffController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\InvoiceController;

// ============================================================
// PUBLIC ROUTES — Không cần auth
// ============================================================

Route::get('/health', fn() => response()->json(['status' => 'API is running successfully']));

// Auth
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/admin-login', [AuthController::class, 'adminLogin']);
});

// Public browse
Route::get('/room-types', [RoomTypeController::class, 'index']);
Route::get('/room-types/{id}', [RoomTypeController::class, 'show']);
Route::get('/rooms', [RoomController::class, 'index']);
Route::get('/rooms/available', [RoomController::class, 'available']);
Route::get('/rooms/{id}', [RoomController::class, 'show']);
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{id}', [ServiceController::class, 'show']);
Route::get('/combos', [ComboController::class, 'index']);
Route::get('/combos/{id}', [ComboController::class, 'show']);
Route::get('/combo/{id}/preview', [BookingController::class, 'getComboPreview']);

// Home page data
Route::get('/home', function () {
    $rooms = \App\Models\LoaiPhong::where('TrangThai', 'Hoạt động')->get();
    $combos = \App\Models\GoiCombo::where('TrangThai', 'Hoạt động')->get();
    $services = \App\Models\DichVu::where('TrangThai', 'Hoạt động')->get();
    return response()->json([
        'rooms'    => $rooms,
        'combos'   => $combos,
        'services' => $services,
    ]);
});

// ============================================================
// USER ROUTES — Cần auth (khách hàng đã đăng nhập)
// ============================================================

Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);

    // User profile
    Route::get('/user/profile', [CustomerController::class, 'profile']);
    Route::put('/user/profile', [CustomerController::class, 'updateProfile']);

    // User bookings
    Route::get('/user/bookings', [BookingController::class, 'myBookings']);
    Route::get('/user/bookings/{id}', [BookingController::class, 'myBookingDetail']);
    Route::post('/user/bookings', [BookingController::class, 'createBooking']);

    // User invoices
    Route::get('/user/invoices', [InvoiceController::class, 'myInvoices']);
    Route::get('/user/invoices/{id}', [InvoiceController::class, 'myInvoiceDetail']);

    // Service modification on booking
    Route::post('/bookings/{id}/services', [BookingController::class, 'modifyService']);
    Route::get('/bookings/{id}/bill', [BookingController::class, 'calculateBill']);

    // Change password
    Route::put('/user/change-password', [AuthController::class, 'changePassword']);
});

// ============================================================
// ADMIN ROUTES — Cần auth + role admin/staff
// ============================================================

Route::middleware(['auth:sanctum', 'role'])->prefix('admin')->group(function () {
    // Dashboard
    Route::get('/dashboard', [BookingController::class, 'dashboard']);

    // Room Types CRUD
    Route::post('/room-types', [RoomTypeController::class, 'store']);
    Route::put('/room-types/{id}', [RoomTypeController::class, 'update']);
    Route::delete('/room-types/{id}', [RoomTypeController::class, 'destroy']);

    // Rooms CRUD
    Route::post('/rooms', [RoomController::class, 'store']);
    Route::put('/rooms/{id}', [RoomController::class, 'update']);
    Route::delete('/rooms/{id}', [RoomController::class, 'destroy']);

    // Services CRUD
    Route::post('/services', [ServiceController::class, 'store']);
    Route::put('/services/{id}', [ServiceController::class, 'update']);
    Route::delete('/services/{id}', [ServiceController::class, 'destroy']);

    // Combos CRUD
    Route::post('/combos', [ComboController::class, 'store']);
    Route::put('/combos/{id}', [ComboController::class, 'update']);
    Route::delete('/combos/{id}', [ComboController::class, 'destroy']);

    // Combo Service CRUD
    Route::post('/combos/{id}/services', [ComboController::class, 'addService']);
    Route::put('/combos/{id}/services/{serviceId}', [ComboController::class, 'updateService']);
    Route::delete('/combos/{id}/services/{serviceId}', [ComboController::class, 'removeService']);

    // Customers CRUD
    Route::get('/customers', [CustomerController::class, 'index']);
    Route::get('/customers/{id}', [CustomerController::class, 'show']);
    Route::post('/customers', [CustomerController::class, 'store']);
    Route::put('/customers/{id}', [CustomerController::class, 'update']);
    Route::delete('/customers/{id}', [CustomerController::class, 'destroy']);

    // Staff CRUD
    Route::get('/staff', [StaffController::class, 'index']);
    Route::get('/staff/{id}', [StaffController::class, 'show']);
    Route::post('/staff', [StaffController::class, 'store']);
    Route::put('/staff/{id}', [StaffController::class, 'update']);
    Route::delete('/staff/{id}', [StaffController::class, 'destroy']);

    // Roles CRUD
    Route::get('/roles', [RoleController::class, 'index']);
    Route::get('/roles/{id}', [RoleController::class, 'show']);
    Route::post('/roles', [RoleController::class, 'store']);
    Route::put('/roles/{id}', [RoleController::class, 'update']);
    Route::delete('/roles/{id}', [RoleController::class, 'destroy']);

    // Bookings CRUD
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::get('/bookings/{id}', [BookingController::class, 'show']);
    Route::put('/bookings/{id}/status', [BookingController::class, 'updateStatus']);

    // Invoices CRUD
    Route::get('/invoices', [InvoiceController::class, 'index']);
    Route::get('/invoices/{id}', [InvoiceController::class, 'show']);
    Route::post('/invoices', [InvoiceController::class, 'store']);
    Route::put('/invoices/{id}', [InvoiceController::class, 'update']);
    Route::delete('/invoices/{id}', [InvoiceController::class, 'destroy']);
});
