--
-- PostgreSQL database dump
--

\restrict W5JAnMIVBcGTUNBngIlif6U4o0Sqc2gUKf7jwniCP0EYDWZYHxHRNtfO5LxHDj5

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-05-17 22:31:29

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 871 (class 1247 OID 16530)
-- Name: EstadoGestora; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."EstadoGestora" AS ENUM (
    'PENDIENTE',
    'VERIFICADA',
    'RESTRINGIDA'
);


ALTER TYPE public."EstadoGestora" OWNER TO postgres;

--
-- TOC entry 874 (class 1247 OID 16538)
-- Name: EstadoVenta; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."EstadoVenta" AS ENUM (
    'PENDIENTE',
    'PAGADA',
    'CANCELADA',
    'REEMBOLSADA'
);


ALTER TYPE public."EstadoVenta" OWNER TO postgres;

--
-- TOC entry 868 (class 1247 OID 16525)
-- Name: TipoUsuario; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TipoUsuario" AS ENUM (
    'CLIENTE',
    'EMPRESA',
    'ADMIN'
);


ALTER TYPE public."TipoUsuario" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16510)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16618)
-- Name: abonos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.abonos (
    id integer NOT NULL,
    "festivalId" integer NOT NULL,
    nombre text NOT NULL,
    descripcion text,
    precio numeric(10,2) NOT NULL,
    stock integer NOT NULL,
    "creadoEn" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.abonos OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16617)
-- Name: abonos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.abonos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.abonos_id_seq OWNER TO postgres;

--
-- TOC entry 5102 (class 0 OID 0)
-- Dependencies: 227
-- Name: abonos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.abonos_id_seq OWNED BY public.abonos.id;


--
-- TOC entry 222 (class 1259 OID 16559)
-- Name: clientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clientes (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    dni text NOT NULL,
    nombre text NOT NULL,
    apellidos text NOT NULL,
    "fechaNacimiento" timestamp(3) without time zone NOT NULL,
    telefono text NOT NULL,
    "fechaBaja" timestamp(3) without time zone,
    "creadoEn" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.clientes OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16558)
-- Name: clientes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clientes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.clientes_id_seq OWNER TO postgres;

--
-- TOC entry 5103 (class 0 OID 0)
-- Dependencies: 221
-- Name: clientes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clientes_id_seq OWNED BY public.clientes.id;


--
-- TOC entry 224 (class 1259 OID 16578)
-- Name: empresas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.empresas (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "razonSocial" text NOT NULL,
    cif text NOT NULL,
    "domicilioSocial" text NOT NULL,
    "nombreContacto" text NOT NULL,
    "telefonoContacto" text NOT NULL,
    estado public."EstadoGestora" DEFAULT 'PENDIENTE'::public."EstadoGestora" NOT NULL,
    "fechaBaja" timestamp(3) without time zone,
    "creadoEn" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.empresas OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16577)
-- Name: empresas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.empresas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.empresas_id_seq OWNER TO postgres;

--
-- TOC entry 5104 (class 0 OID 0)
-- Dependencies: 223
-- Name: empresas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.empresas_id_seq OWNED BY public.empresas.id;


--
-- TOC entry 226 (class 1259 OID 16599)
-- Name: festivales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.festivales (
    id integer NOT NULL,
    "empresaId" integer NOT NULL,
    nombre text NOT NULL,
    descripcion text,
    ubicacion text NOT NULL,
    "fechaInicio" timestamp(3) without time zone NOT NULL,
    "fechaFin" timestamp(3) without time zone NOT NULL,
    imagen text,
    activo boolean DEFAULT true NOT NULL,
    "creadoEn" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    aforo integer NOT NULL,
    artistas text[]
);


ALTER TABLE public.festivales OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16598)
-- Name: festivales_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.festivales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.festivales_id_seq OWNER TO postgres;

--
-- TOC entry 5105 (class 0 OID 0)
-- Dependencies: 225
-- Name: festivales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.festivales_id_seq OWNED BY public.festivales.id;


--
-- TOC entry 220 (class 1259 OID 16547)
-- Name: registro_emails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.registro_emails (
    email text NOT NULL,
    baneado boolean DEFAULT false NOT NULL,
    tipo public."TipoUsuario" NOT NULL
);


ALTER TABLE public.registro_emails OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 16648)
-- Name: venta_abono; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.venta_abono (
    id integer NOT NULL,
    "ventaId" integer NOT NULL,
    "abonoId" integer NOT NULL,
    cantidad integer NOT NULL,
    "precioUnit" numeric(10,2) NOT NULL
);


ALTER TABLE public.venta_abono OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16647)
-- Name: venta_abono_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.venta_abono_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.venta_abono_id_seq OWNER TO postgres;

--
-- TOC entry 5106 (class 0 OID 0)
-- Dependencies: 231
-- Name: venta_abono_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.venta_abono_id_seq OWNED BY public.venta_abono.id;


--
-- TOC entry 230 (class 1259 OID 16634)
-- Name: ventas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ventas (
    id integer NOT NULL,
    "clienteId" integer NOT NULL,
    total numeric(10,2) NOT NULL,
    estado public."EstadoVenta" DEFAULT 'PENDIENTE'::public."EstadoVenta" NOT NULL,
    "creadoEn" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.ventas OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16633)
-- Name: ventas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ventas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ventas_id_seq OWNER TO postgres;

--
-- TOC entry 5107 (class 0 OID 0)
-- Dependencies: 229
-- Name: ventas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ventas_id_seq OWNED BY public.ventas.id;


--
-- TOC entry 4909 (class 2604 OID 16621)
-- Name: abonos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.abonos ALTER COLUMN id SET DEFAULT nextval('public.abonos_id_seq'::regclass);


--
-- TOC entry 4901 (class 2604 OID 16562)
-- Name: clientes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes ALTER COLUMN id SET DEFAULT nextval('public.clientes_id_seq'::regclass);


--
-- TOC entry 4903 (class 2604 OID 16581)
-- Name: empresas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empresas ALTER COLUMN id SET DEFAULT nextval('public.empresas_id_seq'::regclass);


--
-- TOC entry 4906 (class 2604 OID 16602)
-- Name: festivales id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.festivales ALTER COLUMN id SET DEFAULT nextval('public.festivales_id_seq'::regclass);


--
-- TOC entry 4914 (class 2604 OID 16651)
-- Name: venta_abono id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venta_abono ALTER COLUMN id SET DEFAULT nextval('public.venta_abono_id_seq'::regclass);


--
-- TOC entry 4911 (class 2604 OID 16637)
-- Name: ventas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas ALTER COLUMN id SET DEFAULT nextval('public.ventas_id_seq'::regclass);


--
-- TOC entry 5083 (class 0 OID 16510)
-- Dependencies: 219
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public._prisma_migrations VALUES ('c75e53d2-5743-4f6b-a03a-e41797bfa07d', '34f3b2ff5d23dc2a83949cbf997d6772d70f54d70f4270deb5d354b6e8e3e55e', '2026-05-10 20:11:52.084643+02', '20260510181152_cambiar_enum', NULL, NULL, '2026-05-10 20:11:52.053483+02', 1);


--
-- TOC entry 5092 (class 0 OID 16618)
-- Dependencies: 228
-- Data for Name: abonos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.abonos VALUES (1, 1, 'Abono General', 'Abono general para la entrada al festival', 75.00, 1999, '2026-05-17 20:15:44.323');
INSERT INTO public.abonos VALUES (2, 2, 'Abono General', 'Abono general para la entrada al festival', 50.00, 999, '2026-05-17 20:15:44.323');
INSERT INTO public.abonos VALUES (4, 4, 'Abono General', 'Abono general para la entrada al festival', 90.00, 2999, '2026-05-17 20:17:01.214');
INSERT INTO public.abonos VALUES (3, 3, 'Abono General', 'Abono general para la entrada al festival', 40.00, 499, '2026-05-17 20:16:20.523');
INSERT INTO public.abonos VALUES (5, 1, 'Abono Barato', 'Abono barato para los más rápidos', 55.00, 249, '2026-05-17 20:24:58.238');


--
-- TOC entry 5086 (class 0 OID 16559)
-- Dependencies: 222
-- Data for Name: clientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.clientes VALUES (4, 'cliente7@email.com', '$2b$10$.u2yhpjJjn2rZlzfYqI1H.7JwrwEl5DuUt3HeRvYfc5oNfk7Bs2ha', '00000007T', 'Cliente', 'Número 7', '1990-01-07 00:00:00', '610000007', NULL, '2026-05-17 20:11:51.064');
INSERT INTO public.clientes VALUES (6, 'cliente1@email.com', '$2b$10$vSFSc6TBLP.ekPxjLF7qnewLALCkqMmZQoE254npYJSOgdT.l8wKK', '00000001T', 'Cliente', 'Número 1', '1990-01-01 00:00:00', '610000001', NULL, '2026-05-17 20:11:51.214');
INSERT INTO public.clientes VALUES (7, 'cliente9@email.com', '$2b$10$FkBHzsAg3/f8sFQHDlrGHuWX440Hlh.VjMvtdSVTf.vi7Il8x1Vm.', '00000009T', 'Cliente', 'Número 9', '1990-01-09 00:00:00', '610000009', NULL, '2026-05-17 20:11:51.214');
INSERT INTO public.clientes VALUES (8, 'cliente8@email.com', '$2b$10$2KhGUFVCSwX.jhQ39gjxfeR8Quvw.3gpew6v.lIOo3RvvXB9fpemS', '00000008T', 'Cliente', 'Número 8', '1990-01-08 00:00:00', '610000008', NULL, '2026-05-17 20:11:51.366');
INSERT INTO public.clientes VALUES (9, 'cliente5@email.com', '$2b$10$CEgcQd4i.7yecQPHi3LSQOpVbrjD/PZcVIyWXob6EAVHCzqUjTRHm', '00000005T', 'Cliente', 'Número 5', '1990-01-05 00:00:00', '610000005', NULL, '2026-05-17 20:11:51.366');
INSERT INTO public.clientes VALUES (5, 'cliente2@email.com', '$2b$10$si.y3YoY23X5rFYrs7/0Q.zOot14upMKTm/yh.J4/EkaZLcNdTlsO', '00000002T', 'Cliente', 'Número 2', '1990-01-02 00:00:00', '610000002', '2026-05-17 20:14:16.3', '2026-05-17 20:11:51.064');
INSERT INTO public.clientes VALUES (2, 'cliente3@email.com', '$2b$10$6VQCeFZsQcPYRiRJbtjEOuusnqDZNi2LRX2e.1bX/86o4cmAL93nq', '00000003T', 'Cliente', 'Número 3', '1990-01-03 00:00:00', '610000003', '2026-05-17 20:14:18.169', '2026-05-17 20:11:50.832');
INSERT INTO public.clientes VALUES (3, 'cliente4@email.com', '$2b$10$j/XGV4Jm4d6SvRyEZT7L1OiSl1Nh2eYSapHV.n5v3TPoTNhleSPBe', '00000004T', 'Cliente', 'Número 4', '1990-01-04 00:00:00', '610000004', '2026-05-17 20:14:19.751', '2026-05-17 20:11:50.905');
INSERT INTO public.clientes VALUES (1, 'cliente6@email.com', '$2b$10$I0P.uZpS0vDDJTTGe3Vpi.MBHrZtie2J6LGxqNUKRiFOymvsKvdqC', '00000006T', 'Cliente', 'Número 6', '1990-01-06 00:00:00', '610000006', '2026-05-17 20:28:35.549', '2026-05-17 20:11:50.755');


--
-- TOC entry 5088 (class 0 OID 16578)
-- Dependencies: 224
-- Data for Name: empresas; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.empresas VALUES (2, 'empresa6@email.com', '$2b$10$1buRVKb43YJ6SObJDNh0SeCOswSdnC7z4fRRicESH47BniP1y8yue', 'Empresa 6 S.L.', 'A12345676', 'Calle Empresa 6, Madrid', 'Contacto 6', '600000006', 'PENDIENTE', NULL, '2026-05-17 20:13:06.01');
INSERT INTO public.empresas VALUES (6, 'empresa5@email.com', '$2b$10$fBDfjld8SJhPy2acfMOuw.jphrdAi57AuU7bN97S5dOvzhQX.IhJe', 'Empresa 5 S.L.', 'A12345675', 'Calle Empresa 5, Madrid', 'Contacto 5', '600000005', 'VERIFICADA', NULL, '2026-05-17 20:13:06.308');
INSERT INTO public.empresas VALUES (1, 'empresa2@email.com', '$2b$10$WR74uFSUHU/xPTRok.Wr.usDoJqIs8IPF3SWbUmuwSwP2FrHr7qsu', 'Empresa 2 S.L.', 'A12345672', 'Calle Empresa 2, Madrid', 'Contacto 2', '600000002', 'RESTRINGIDA', '2026-05-17 20:14:22.154', '2026-05-17 20:13:06.008');
INSERT INTO public.empresas VALUES (5, 'empresa4@email.com', '$2b$10$RUWeqyOlD0O4hBcGnushneGIsa.BsvBzWsmly95J/4OfXAxv3KwOm', 'Empresa 4 S.L.', 'A12345674', 'Calle Empresa 4, Madrid', 'Contacto 4', '600000004', 'PENDIENTE', NULL, '2026-05-17 20:13:06.222');
INSERT INTO public.empresas VALUES (4, 'empresa1@email.com', '$2b$10$l4qdQWYINhjReXHzGk3S4OcoYI94uPvAqV6/gPKFQoeA3xo8HIl.6', 'Empresa 1 S.L.', 'A12345671', 'Calle Empresa 1, Madrid', 'Contacto 1', '600000001', 'VERIFICADA', NULL, '2026-05-17 20:13:06.149');
INSERT INTO public.empresas VALUES (3, 'empresa3@email.com', '$2b$10$/wek5eTvFQYPSykPweDZ0uIqx/EBKjx0JUiELmh/TxGVz/UtXUYAO', 'Empresa 3 S.L.', 'A12345673', 'Calle Empresa 3, Madrid', 'Contacto 3', '600000003', 'VERIFICADA', NULL, '2026-05-17 20:13:06.086');


--
-- TOC entry 5090 (class 0 OID 16599)
-- Dependencies: 226
-- Data for Name: festivales; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.festivales VALUES (2, 4, 'Festival 1', NULL, 'Madrid', '2027-06-01 00:00:00', '2027-06-03 00:00:00', NULL, true, '2026-05-17 20:15:44.323', 5000, '{"Artista A","Artista B"}');
INSERT INTO public.festivales VALUES (3, 3, 'Festival 3', NULL, 'Valencia', '2027-08-05 00:00:00', '2027-08-06 00:00:00', NULL, true, '2026-05-17 20:16:20.523', 3000, NULL);
INSERT INTO public.festivales VALUES (4, 6, 'Festival 4', NULL, 'Sevilla', '2027-09-15 00:00:00', '2027-09-17 00:00:00', NULL, true, '2026-05-17 20:17:01.214', 10000, '{"Artista D","Artista E","Artista F"}');
INSERT INTO public.festivales VALUES (1, 4, 'Festival 2', NULL, 'Barcelona', '2027-07-10 00:00:00', '2027-07-12 00:00:00', 'https://cdn.creativefabrica.com/2020/10/03/Festival-Logo-Vector-Modern-Symbol-Graphics-5833150-2-580x386.png', true, '2026-05-17 20:15:44.323', 8000, '{"Artista C"}');


--
-- TOC entry 5084 (class 0 OID 16547)
-- Dependencies: 220
-- Data for Name: registro_emails; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.registro_emails VALUES ('cliente7@email.com', false, 'CLIENTE');
INSERT INTO public.registro_emails VALUES ('cliente1@email.com', false, 'CLIENTE');
INSERT INTO public.registro_emails VALUES ('cliente9@email.com', false, 'CLIENTE');
INSERT INTO public.registro_emails VALUES ('cliente5@email.com', false, 'CLIENTE');
INSERT INTO public.registro_emails VALUES ('cliente8@email.com', false, 'CLIENTE');
INSERT INTO public.registro_emails VALUES ('empresa6@email.com', false, 'EMPRESA');
INSERT INTO public.registro_emails VALUES ('empresa3@email.com', false, 'EMPRESA');
INSERT INTO public.registro_emails VALUES ('empresa1@email.com', false, 'EMPRESA');
INSERT INTO public.registro_emails VALUES ('empresa4@email.com', false, 'EMPRESA');
INSERT INTO public.registro_emails VALUES ('empresa5@email.com', false, 'EMPRESA');
INSERT INTO public.registro_emails VALUES ('cliente2@email.com', true, 'CLIENTE');
INSERT INTO public.registro_emails VALUES ('cliente3@email.com', true, 'CLIENTE');
INSERT INTO public.registro_emails VALUES ('cliente4@email.com', true, 'CLIENTE');
INSERT INTO public.registro_emails VALUES ('empresa2@email.com', true, 'EMPRESA');


--
-- TOC entry 5096 (class 0 OID 16648)
-- Dependencies: 232
-- Data for Name: venta_abono; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.venta_abono VALUES (1, 1, 1, 1, 75.00);
INSERT INTO public.venta_abono VALUES (2, 2, 2, 1, 50.00);
INSERT INTO public.venta_abono VALUES (3, 3, 4, 1, 90.00);
INSERT INTO public.venta_abono VALUES (4, 4, 3, 1, 40.00);
INSERT INTO public.venta_abono VALUES (5, 5, 3, 1, 40.00);
INSERT INTO public.venta_abono VALUES (6, 6, 3, 1, 40.00);
INSERT INTO public.venta_abono VALUES (7, 7, 5, 1, 55.00);
INSERT INTO public.venta_abono VALUES (8, 8, 5, 1, 55.00);


--
-- TOC entry 5094 (class 0 OID 16634)
-- Dependencies: 230
-- Data for Name: ventas; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ventas VALUES (1, 6, 75.00, 'PAGADA', '2026-05-17 20:22:19.292');
INSERT INTO public.ventas VALUES (2, 6, 50.00, 'PAGADA', '2026-05-17 20:22:37.802');
INSERT INTO public.ventas VALUES (3, 6, 90.00, 'PAGADA', '2026-05-17 20:22:54.554');
INSERT INTO public.ventas VALUES (4, 9, 40.00, 'CANCELADA', '2026-05-17 20:26:30.341');
INSERT INTO public.ventas VALUES (5, 9, 40.00, 'CANCELADA', '2026-05-17 20:26:35.383');
INSERT INTO public.ventas VALUES (6, 9, 40.00, 'PAGADA', '2026-05-17 20:26:36.905');
INSERT INTO public.ventas VALUES (7, 7, 55.00, 'CANCELADA', '2026-05-17 20:27:20.325');
INSERT INTO public.ventas VALUES (8, 7, 55.00, 'PAGADA', '2026-05-17 20:27:21.758');


--
-- TOC entry 5108 (class 0 OID 0)
-- Dependencies: 227
-- Name: abonos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.abonos_id_seq', 5, true);


--
-- TOC entry 5109 (class 0 OID 0)
-- Dependencies: 221
-- Name: clientes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clientes_id_seq', 9, true);


--
-- TOC entry 5110 (class 0 OID 0)
-- Dependencies: 223
-- Name: empresas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.empresas_id_seq', 6, true);


--
-- TOC entry 5111 (class 0 OID 0)
-- Dependencies: 225
-- Name: festivales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.festivales_id_seq', 4, true);


--
-- TOC entry 5112 (class 0 OID 0)
-- Dependencies: 231
-- Name: venta_abono_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.venta_abono_id_seq', 8, true);


--
-- TOC entry 5113 (class 0 OID 0)
-- Dependencies: 229
-- Name: ventas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_id_seq', 8, true);


--
-- TOC entry 4916 (class 2606 OID 16523)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4926 (class 2606 OID 16632)
-- Name: abonos abonos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.abonos
    ADD CONSTRAINT abonos_pkey PRIMARY KEY (id);


--
-- TOC entry 4920 (class 2606 OID 16576)
-- Name: clientes clientes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_pkey PRIMARY KEY (id);


--
-- TOC entry 4922 (class 2606 OID 16597)
-- Name: empresas empresas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empresas
    ADD CONSTRAINT empresas_pkey PRIMARY KEY (id);


--
-- TOC entry 4924 (class 2606 OID 16616)
-- Name: festivales festivales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.festivales
    ADD CONSTRAINT festivales_pkey PRIMARY KEY (id);


--
-- TOC entry 4918 (class 2606 OID 16557)
-- Name: registro_emails registro_emails_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registro_emails
    ADD CONSTRAINT registro_emails_pkey PRIMARY KEY (email);


--
-- TOC entry 4930 (class 2606 OID 16658)
-- Name: venta_abono venta_abono_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venta_abono
    ADD CONSTRAINT venta_abono_pkey PRIMARY KEY (id);


--
-- TOC entry 4928 (class 2606 OID 16646)
-- Name: ventas ventas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT ventas_pkey PRIMARY KEY (id);


--
-- TOC entry 4932 (class 2606 OID 16664)
-- Name: abonos abonos_festivalId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.abonos
    ADD CONSTRAINT "abonos_festivalId_fkey" FOREIGN KEY ("festivalId") REFERENCES public.festivales(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4931 (class 2606 OID 16659)
-- Name: festivales festivales_empresaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.festivales
    ADD CONSTRAINT "festivales_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES public.empresas(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4934 (class 2606 OID 16679)
-- Name: venta_abono venta_abono_abonoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venta_abono
    ADD CONSTRAINT "venta_abono_abonoId_fkey" FOREIGN KEY ("abonoId") REFERENCES public.abonos(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4935 (class 2606 OID 16674)
-- Name: venta_abono venta_abono_ventaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venta_abono
    ADD CONSTRAINT "venta_abono_ventaId_fkey" FOREIGN KEY ("ventaId") REFERENCES public.ventas(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4933 (class 2606 OID 16669)
-- Name: ventas ventas_clienteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT "ventas_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES public.clientes(id) ON UPDATE CASCADE ON DELETE RESTRICT;


-- Completed on 2026-05-17 22:31:29

--
-- PostgreSQL database dump complete
--

\unrestrict W5JAnMIVBcGTUNBngIlif6U4o0Sqc2gUKf7jwniCP0EYDWZYHxHRNtfO5LxHDj5

