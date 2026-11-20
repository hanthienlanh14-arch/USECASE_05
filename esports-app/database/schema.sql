-- Hệ thống quản lý giải đấu Esports (Nhóm 1) - schema từ Chương 5
SET NAMES utf8mb4;
CREATE DATABASE IF NOT EXISTS QuanLyEsports CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE QuanLyEsports;

CREATE TABLE IF NOT EXISTS GiaiDau (
    MaGiaiDau   INT PRIMARY KEY AUTO_INCREMENT,
    TenGiaiDau  VARCHAR(100) NOT NULL,
    NgayBatDau  DATE,
    NgayKetThuc DATE,
    TrangThai   VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS DoiTuyen (
    MaDoi        INT PRIMARY KEY AUTO_INCREMENT,
    TenDoi       VARCHAR(100) NOT NULL,
    TenGame      VARCHAR(50),
    TenDoiTruong VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS DangKy (
    MaGiaiDau  INT,
    MaDoi      INT,
    NgayDangKy DATE,
    PRIMARY KEY (MaGiaiDau, MaDoi),
    FOREIGN KEY (MaGiaiDau) REFERENCES GiaiDau(MaGiaiDau),
    FOREIGN KEY (MaDoi)     REFERENCES DoiTuyen(MaDoi)
);

CREATE TABLE IF NOT EXISTS TranDau (
    MaTran     INT PRIMARY KEY AUTO_INCREMENT,
    MaGiaiDau  INT,
    MaDoi1     INT,
    MaDoi2     INT,
    NgayThiDau DATE,
    TiSo       VARCHAR(10),
    FOREIGN KEY (MaGiaiDau) REFERENCES GiaiDau(MaGiaiDau),
    FOREIGN KEY (MaDoi1)    REFERENCES DoiTuyen(MaDoi),
    FOREIGN KEY (MaDoi2)    REFERENCES DoiTuyen(MaDoi)
);
