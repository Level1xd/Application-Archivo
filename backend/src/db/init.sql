-- Crear base de datos y uso
CREATE DATABASE ArchivoMPGT;
GO
USE ArchivoMPGT;
GO

-- Tabla EXPEDIENTE
CREATE TABLE EXPEDIENTE (
  id INT IDENTITY PRIMARY KEY,
  codigo_unico VARCHAR(50) UNIQUE,
  fecha_recepcion DATE,
  fiscal_remitente VARCHAR(100),
  estado VARCHAR(20)
);
GO

-- Tabla MOVIMIENTO
CREATE TABLE MOVIMIENTO (
  id INT IDENTITY PRIMARY KEY,
  expediente_id INT FOREIGN KEY REFERENCES EXPEDIENTE(id),
  usuario_id INT,
  tipo VARCHAR(10),
  fecha DATETIME,
  motivo VARCHAR(200)
);
GO

-- SP: Insertar Expediente
CREATE PROCEDURE sp_InsertExpediente
  @codigo_unico VARCHAR(50),
  @fiscal_remitente VARCHAR(100),
  @fecha_recepcion DATE
AS
BEGIN
  INSERT INTO EXPEDIENTE (codigo_unico, fecha_recepcion, fiscal_remitente, estado)
  VALUES (@codigo_unico, @fecha_recepcion, @fiscal_remitente, 'INGRESADO');
  SELECT SCOPE_IDENTITY() AS newId;
END;
GO

-- SP: Insertar Movimiento
CREATE PROCEDURE sp_InsertMovimiento
  @expediente_id INT,
  @usuario_id INT,
  @tipo VARCHAR(10),
  @fecha DATETIME,
  @motivo VARCHAR(200)
AS
BEGIN
  INSERT INTO MOVIMIENTO (expediente_id, usuario_id, tipo, fecha, motivo)
  VALUES (@expediente_id, @usuario_id, @tipo, @fecha, @motivo);
END;
GO