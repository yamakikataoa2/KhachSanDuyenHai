<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Thêm PhanTramGiam cho gói combo
        Schema::table('goicombo', function (Blueprint $table) {
            $table->decimal('PhanTramGiam', 5, 2)->default(0)->after('GiaGoi');
        });

        // Thêm NhomDV cho dịch vụ (phân nhóm: Wellness, Ẩm thực, etc.)
        Schema::table('dichvu', function (Blueprint $table) {
            $table->string('NhomDV', 50)->nullable()->after('DonViTinh');
        });

        // Thêm Email cho nhân viên
        Schema::table('nhanvien', function (Blueprint $table) {
            $table->string('Email', 100)->nullable()->after('SoDienThoai');
        });
    }

    public function down()
    {
        Schema::table('goicombo', function (Blueprint $table) {
            $table->dropColumn('PhanTramGiam');
        });
        Schema::table('dichvu', function (Blueprint $table) {
            $table->dropColumn('NhomDV');
        });
        Schema::table('nhanvien', function (Blueprint $table) {
            $table->dropColumn('Email');
        });
    }
};
