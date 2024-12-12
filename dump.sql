--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: note; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.note (
    id integer NOT NULL,
    title character varying NOT NULL,
    content text NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "ownerId" integer
);


ALTER TABLE public.note OWNER TO postgres;

--
-- Name: note_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.note_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.note_id_seq OWNER TO postgres;

--
-- Name: note_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.note_id_seq OWNED BY public.note.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    age integer
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: note id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.note ALTER COLUMN id SET DEFAULT nextval('public.note_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: note; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.note (id, title, content, "updatedAt", "ownerId") FROM stdin;
2	LoremIpsum	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum sodales lacus, a faucibus libero cursus et. Aliquam vel faucibus nulla. Ut in lorem sodales mauris egestas dapibus ut vitae felis. Maecenas vitae lorem ligula. Sed lorem enim, placerat eu orci sit amet, sodales lacinia turpis. Morbi dictum lectus nisl, vel lacinia neque ultrices ut. Vivamus id purus rhoncus, malesuada dolor porta, interdum quam. Phasellus accumsan eget lorem at rhoncus. Pellentesque condimentum egestas posuere. Nulla convallis a magna in congue. Etiam feugiat urna sed arcu auctor cursus. Donec et nibh sed neque varius pharetra. Suspendisse at mauris scelerisque augue iaculis auctor nec nec augue. Cras rhoncus hendrerit nibh et commodo. Vivamus et nisi sem. Morbi nec placerat turpis.	2024-12-11 19:23:50.062306	3
6	Nullita	Nulla eget dignissim elit. Cras risus nisi, viverra id velit et, auctor dignissim velit. Nulla pharetra eleifend vestibulum. Nulla elit odio, fermentum eu aliquet a, viverra quis orci. Ut in consequat nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et nisi non velit tincidunt gravida eget et dui. Mauris posuere condimentum mauris eget vulputate. Curabitur ut risus vel nisi consequat placerat. Quisque tempus efficitur nibh, in interdum ipsum rutrum fermentum. Quisque imperdiet ornare purus quis faucibus. Aliquam lectus nisi, ultrices at viverra a, dictum in enim.	2024-12-12 00:26:30.617	5
4	LoremIpsum	Lorem Ipsum Cras risus nisi, viverra id velit et, auctor dignissim velit. Nulla pharetra eleifend vestibulum. Nulla elit odio, fermentum eu aliquet a, viverra quis orci. Ut in consequat nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et nisi non velit tincidunt gravida eget et dui. Mauris posuere condimentum mauris eget vulputate. Curabitur ut risus vel nisi consequat placerat. Quisque tempus efficitur nibh, in interdum ipsum rutrum fermentum. Quisque imperdiet ornare purus quis faucibus. Aliquam lectus nisi, ultrices at viverra a, dictum in enim.	2024-12-13 00:26:30.617	4
3	LoremIpsum	Note editée la famille	2024-12-12 01:25:25.818302	3
1	Bonjour	lorem ipsum long textes ..... TRES LONG	2024-12-12 01:25:51.343681	3
7	Nulla	Nulla eget dignissim elit. Cras risus nisi, viverra id velit et, auctor dignissim velit. Nulla pharetra eleifend vestibulum. Nulla elit odio, fermentum eu aliquet a, viverra quis orci. Ut in consequat nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et nisi non velit tincidunt gravida eget et dui. Mauris posuere condimentum mauris eget vulputate. Curabitur ut risus vel nisi consequat placerat. Quisque tempus efficitur nibh, in interdum ipsum rutrum fermentum. Quisque imperdiet ornare purus quis faucibus. Aliquam lectus nisi, ultrices at viverra a, dictum in enim.	2024-12-12 02:12:53.677333	5
5	Nulla eget elit	Nulla eget dignissim elit. Cras risus nisi, viverra id velit et, auctor dignissim velit. Nulla pharetra eleifend vestibulum. Nulla elit odio, fermentum eu aliquet a, viverra quis orci. Ut in consequat nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et nisi non velit tincidunt gravida eget et dui. Mauris posuere condimentum mauris eget vulputate. Curabitur ut risus vel nisi consequat placerat. Quisque tempus efficitur nibh, in interdum ipsum rutrum fermentum. Quisque imperdiet ornare purus quis faucibus. Aliquam lectus nisi, ultrices at viverra a, dictum in enim.	2024-12-12 02:13:24.836237	4
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, first_name, last_name, username, password, age) FROM stdin;
2	Sylvain	Norel	sylvano	password	\N
3	Dorian	Blali	doriano	$2b$10$ZjOPVGhHab6Rjr700M7U6.X1gd4cBpieNg2H.ttXX5CrbDx7tBm7W	\N
4	user3	blabla	user3	$2b$10$L6SG/Q1G1L4hMSpqaRDB2eKggo8.HgpGK0dyBjJE9nTN16ZwemxmW	\N
5	user56	blablabla	monsieur blablabla	$2b$10$je7xGPrDAnacN9pP9kIV0Oik1Tn4oH687BCdiaCjed4GTTl/9QCmG	\N
1	Arnaud	Norel	arnolito	password	\N
\.


--
-- Name: note_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.note_id_seq', 7, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 7, true);


--
-- Name: note PK_96d0c172a4fba276b1bbed43058; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.note
    ADD CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: user UQ_78a916df40e02a9deb1c4b75edb; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username);


--
-- Name: note FK_b09836eba01a8653c0628a78af8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.note
    ADD CONSTRAINT "FK_b09836eba01a8653c0628a78af8" FOREIGN KEY ("ownerId") REFERENCES public."user"(id);


--
-- PostgreSQL database dump complete
--

