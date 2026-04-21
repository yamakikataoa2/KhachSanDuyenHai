<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // D1: GoiCombo thiếu SoNgay, SoNguoi
        Schema::table('goicombo', function (Blueprint $table) {
            $table->integer('SoNgay')->default(2)->after('MoTa');
            $table->integer('SoNguoi')->default(2)->after('SoNgay');
        });

        // D3: LoaiPhong thiếu DienTich, TienNghi
        Schema::table('loaiphong', function (Blueprint $table) {
            $table->integer('DienTich')->nullable()->after('SoNguoiToiDa');
            $table->text('TienNghi')->nullable()->after('DienTich');
        });

        // D4: PhieuDatPhong thiếu SoNguoiO
        Schema::table('phieudatphong', function (Blueprint $table) {
            $table->integer('SoNguoiO')->default(1)->after('GhiChu');
        });
    }

    public function down()
    {
        Schema::table('goicombo', function (Blueprint $table) {
            $table->dropColumn(['SoNgay', 'SoNguoi']);
        });
        Schema::table('loaiphong', function (Blueprint $table) {
            $table->dropColumn(['DienTich', 'TienNghi']);
        });
        Schema::table('phieudatphong', function (Blueprint $table) {
            $table->dropColumn('SoNguoiO');
        });
    }
};
