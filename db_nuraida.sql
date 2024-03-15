PGDMP  +    ;                |            nuraida    16.2    16.0 :    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16398    nuraida    DATABASE     �   CREATE DATABASE nuraida WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Indonesian_Indonesia.1252';
    DROP DATABASE nuraida;
                postgres    false            �            1259    16399    answers    TABLE     �   CREATE TABLE public.answers (
    _id integer NOT NULL,
    exam_id integer NOT NULL,
    quiz_id integer NOT NULL,
    student_id integer NOT NULL,
    answer character varying(255),
    answer_essay text,
    answer_score numeric DEFAULT 0
);
    DROP TABLE public.answers;
       public         heap    postgres    false            �            1259    16405    answers__id_seq    SEQUENCE     �   CREATE SEQUENCE public.answers__id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.answers__id_seq;
       public          postgres    false    215            �           0    0    answers__id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.answers__id_seq OWNED BY public.answers._id;
          public          postgres    false    216            �            1259    16406    class    TABLE     ~   CREATE TABLE public.class (
    class_id integer NOT NULL,
    class character varying(255) NOT NULL,
    grade_id integer
);
    DROP TABLE public.class;
       public         heap    postgres    false            �            1259    16409    class_class_id_seq    SEQUENCE     �   CREATE SEQUENCE public.class_class_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.class_class_id_seq;
       public          postgres    false    217                        0    0    class_class_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.class_class_id_seq OWNED BY public.class.class_id;
          public          postgres    false    218            �            1259    16464 
   exam_rooms    TABLE     Q  CREATE TABLE public.exam_rooms (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255),
    code character varying(255) NOT NULL,
    teacher_id integer NOT NULL,
    exam_id integer NOT NULL,
    status integer DEFAULT 1,
    date_start date,
    time_start time without time zone
);
    DROP TABLE public.exam_rooms;
       public         heap    postgres    false            �            1259    16463    exam_rooms_id_seq    SEQUENCE     �   ALTER TABLE public.exam_rooms ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.exam_rooms_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    230            �            1259    16410    exams    TABLE       CREATE TABLE public.exams (
    _id integer NOT NULL,
    exam_name character varying(255) NOT NULL,
    teacher_id integer NOT NULL,
    "time" numeric NOT NULL,
    pg numeric NOT NULL,
    essay numeric NOT NULL,
    status boolean DEFAULT false,
    grade_id integer
);
    DROP TABLE public.exams;
       public         heap    postgres    false            �            1259    16416    exams__id_seq    SEQUENCE     �   CREATE SEQUENCE public.exams__id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.exams__id_seq;
       public          postgres    false    219                       0    0    exams__id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.exams__id_seq OWNED BY public.exams._id;
          public          postgres    false    220            �            1259    16417    grades    TABLE     i   CREATE TABLE public.grades (
    grade_id integer NOT NULL,
    grade character varying(255) NOT NULL
);
    DROP TABLE public.grades;
       public         heap    postgres    false            �            1259    16420    grades_grade_id_seq    SEQUENCE     �   CREATE SEQUENCE public.grades_grade_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.grades_grade_id_seq;
       public          postgres    false    221                       0    0    grades_grade_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.grades_grade_id_seq OWNED BY public.grades.grade_id;
          public          postgres    false    222            �            1259    16421 	   questions    TABLE     .  CREATE TABLE public.questions (
    _id integer NOT NULL,
    exam_id integer NOT NULL,
    quiz_type integer DEFAULT 1,
    quiz text NOT NULL,
    img text,
    audio text,
    answer_1 text,
    answer_2 text,
    answer_3 text,
    answer_4 text,
    answer_5 text,
    key character varying(1)
);
    DROP TABLE public.questions;
       public         heap    postgres    false            �            1259    16427    questions__id_seq    SEQUENCE     �   CREATE SEQUENCE public.questions__id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.questions__id_seq;
       public          postgres    false    223                       0    0    questions__id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.questions__id_seq OWNED BY public.questions._id;
          public          postgres    false    224            �            1259    16428    subject    TABLE     n   CREATE TABLE public.subject (
    subject_id integer NOT NULL,
    subject character varying(255) NOT NULL
);
    DROP TABLE public.subject;
       public         heap    postgres    false            �            1259    16431    subject_subject_id_seq    SEQUENCE     �   CREATE SEQUENCE public.subject_subject_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.subject_subject_id_seq;
       public          postgres    false    225                       0    0    subject_subject_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.subject_subject_id_seq OWNED BY public.subject.subject_id;
          public          postgres    false    226            �            1259    16432    users    TABLE     �  CREATE TABLE public.users (
    _id integer NOT NULL,
    nis numeric,
    nip character varying(255),
    name character varying(255) NOT NULL,
    grade_id integer,
    class_id integer,
    subject_id integer,
    phone_number numeric,
    email character varying(255),
    password character varying(255),
    role character varying(255) DEFAULT 'student'::character varying,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16439    users__id_seq    SEQUENCE     �   CREATE SEQUENCE public.users__id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.users__id_seq;
       public          postgres    false    227                       0    0    users__id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.users__id_seq OWNED BY public.users._id;
          public          postgres    false    228            =           2604    16440    answers _id    DEFAULT     j   ALTER TABLE ONLY public.answers ALTER COLUMN _id SET DEFAULT nextval('public.answers__id_seq'::regclass);
 :   ALTER TABLE public.answers ALTER COLUMN _id DROP DEFAULT;
       public          postgres    false    216    215            ?           2604    16441    class class_id    DEFAULT     p   ALTER TABLE ONLY public.class ALTER COLUMN class_id SET DEFAULT nextval('public.class_class_id_seq'::regclass);
 =   ALTER TABLE public.class ALTER COLUMN class_id DROP DEFAULT;
       public          postgres    false    218    217            @           2604    16442 	   exams _id    DEFAULT     f   ALTER TABLE ONLY public.exams ALTER COLUMN _id SET DEFAULT nextval('public.exams__id_seq'::regclass);
 8   ALTER TABLE public.exams ALTER COLUMN _id DROP DEFAULT;
       public          postgres    false    220    219            B           2604    16443    grades grade_id    DEFAULT     r   ALTER TABLE ONLY public.grades ALTER COLUMN grade_id SET DEFAULT nextval('public.grades_grade_id_seq'::regclass);
 >   ALTER TABLE public.grades ALTER COLUMN grade_id DROP DEFAULT;
       public          postgres    false    222    221            C           2604    16444    questions _id    DEFAULT     n   ALTER TABLE ONLY public.questions ALTER COLUMN _id SET DEFAULT nextval('public.questions__id_seq'::regclass);
 <   ALTER TABLE public.questions ALTER COLUMN _id DROP DEFAULT;
       public          postgres    false    224    223            E           2604    16445    subject subject_id    DEFAULT     x   ALTER TABLE ONLY public.subject ALTER COLUMN subject_id SET DEFAULT nextval('public.subject_subject_id_seq'::regclass);
 A   ALTER TABLE public.subject ALTER COLUMN subject_id DROP DEFAULT;
       public          postgres    false    226    225            F           2604    16446 	   users _id    DEFAULT     f   ALTER TABLE ONLY public.users ALTER COLUMN _id SET DEFAULT nextval('public.users__id_seq'::regclass);
 8   ALTER TABLE public.users ALTER COLUMN _id DROP DEFAULT;
       public          postgres    false    228    227            �          0    16399    answers 
   TABLE DATA           h   COPY public.answers (_id, exam_id, quiz_id, student_id, answer, answer_essay, answer_score) FROM stdin;
    public          postgres    false    215   ;@       �          0    16406    class 
   TABLE DATA           :   COPY public.class (class_id, class, grade_id) FROM stdin;
    public          postgres    false    217   �@       �          0    16464 
   exam_rooms 
   TABLE DATA           v   COPY public.exam_rooms (id, name, description, code, teacher_id, exam_id, status, date_start, time_start) FROM stdin;
    public          postgres    false    230   FA       �          0    16410    exams 
   TABLE DATA           `   COPY public.exams (_id, exam_name, teacher_id, "time", pg, essay, status, grade_id) FROM stdin;
    public          postgres    false    219   �A       �          0    16417    grades 
   TABLE DATA           1   COPY public.grades (grade_id, grade) FROM stdin;
    public          postgres    false    221   KB       �          0    16421 	   questions 
   TABLE DATA           �   COPY public.questions (_id, exam_id, quiz_type, quiz, img, audio, answer_1, answer_2, answer_3, answer_4, answer_5, key) FROM stdin;
    public          postgres    false    223   �B       �          0    16428    subject 
   TABLE DATA           6   COPY public.subject (subject_id, subject) FROM stdin;
    public          postgres    false    225   �I       �          0    16432    users 
   TABLE DATA           �   COPY public.users (_id, nis, nip, name, grade_id, class_id, subject_id, phone_number, email, password, role, created_at) FROM stdin;
    public          postgres    false    227   BJ                  0    0    answers__id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.answers__id_seq', 16, true);
          public          postgres    false    216                       0    0    class_class_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.class_class_id_seq', 26, true);
          public          postgres    false    218                       0    0    exam_rooms_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.exam_rooms_id_seq', 4, true);
          public          postgres    false    229            	           0    0    exams__id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.exams__id_seq', 7, true);
          public          postgres    false    220            
           0    0    grades_grade_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.grades_grade_id_seq', 14, true);
          public          postgres    false    222                       0    0    questions__id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.questions__id_seq', 69, true);
          public          postgres    false    224                       0    0    subject_subject_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.subject_subject_id_seq', 8, true);
          public          postgres    false    226                       0    0    users__id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.users__id_seq', 584, true);
          public          postgres    false    228            K           2606    16448    answers answers_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (_id);
 >   ALTER TABLE ONLY public.answers DROP CONSTRAINT answers_pkey;
       public            postgres    false    215            M           2606    16450    class class_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.class
    ADD CONSTRAINT class_pkey PRIMARY KEY (class_id);
 :   ALTER TABLE ONLY public.class DROP CONSTRAINT class_pkey;
       public            postgres    false    217            Y           2606    16471    exam_rooms exam_rooms_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.exam_rooms
    ADD CONSTRAINT exam_rooms_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.exam_rooms DROP CONSTRAINT exam_rooms_pkey;
       public            postgres    false    230            O           2606    16452    exams exams_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.exams
    ADD CONSTRAINT exams_pkey PRIMARY KEY (_id);
 :   ALTER TABLE ONLY public.exams DROP CONSTRAINT exams_pkey;
       public            postgres    false    219            Q           2606    16454    grades grades_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.grades
    ADD CONSTRAINT grades_pkey PRIMARY KEY (grade_id);
 <   ALTER TABLE ONLY public.grades DROP CONSTRAINT grades_pkey;
       public            postgres    false    221            S           2606    16456    questions questions_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (_id);
 B   ALTER TABLE ONLY public.questions DROP CONSTRAINT questions_pkey;
       public            postgres    false    223            U           2606    16458    subject subject_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.subject
    ADD CONSTRAINT subject_pkey PRIMARY KEY (subject_id);
 >   ALTER TABLE ONLY public.subject DROP CONSTRAINT subject_pkey;
       public            postgres    false    225            W           2606    16460    users users_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    227            �   �   x�M�1
�0Eg�=A�d;IǺ�d�
!��޿�a/�Y�I(���h�qY�8Q�	�ʁ��C�<��Jwb��B-��p����t�-���*���v��&`=��M=O���kk���K�n탷�c�J1�      �   c   x�ʹ�@A�J�M��"P�qhMCl�a�ұS8�f'�����ut;��\�T���c)D�	Y� �8�(L!l�e�B��B���k����4�      �   �   x�U��
�@ �ϳO�/��a�v)"C�x�p!��\=����%�`�0|������A�kZ�%gE%!�!�P�O��c"�_}goX�y��޾�঻�H�~���Ի�{^턽NҬ��A�����Tț����V^�*��"@ژ���)L      �   O   x�3�	V���44�43�47�46�L�4�2�8z�8zp�$-8� �F`I�Č��DǢ�$Ncd�&\1z\\\ qdV      �   '   x��I   İw+�a��$a�8v��T'��4_Q?Dk      �   [  x�uW�r�8]��B����$�b��	P�l���m�-KF�c��7�����9��vȤ��K>�u�������Q���Oh+Ό�"�輪��4�r�jy�}zK�o��
��e�=_H:j[�������?6ʊa%�Yq-��[z`յ�2㌼�
��GecV��	��*�{a��{Y��e�υq�J�G(,��9]Icf�+i��e��OC���I����)˸jd���� �p�8�؈F�(Y
YKmCV2�)O�� �T����_$�[q��R�����8%j��ʻv�m� ��#
{��q}p��1�Z{Sy�ly����j�@a��n!E�w^��Z+��ՇYػNYP���3�s�a5K{�9~��^�،�x��!��H��YX��.�m�q�ײ+eL�
��j�5r��z�9��+S���mt���flp���	�C��%\H�6����������S������!1q��*�+�3>;dvKA��K�O$ʮ�,M�@��FJ���((�g�������㓔��� ������.JR�W�2s)���{r�,����p��qw<S�uD����5A��#�*�X�R�8�8��'�ʏ�\t2c������r�&�A������@�]�zP�t�Qcp��H_��#窑r1RR�����&o�����
VD2*�r�d�Z����L}��|fF��)f�倴$1ʮ���;r��{�~�ÊTW&|�e�X4��'�@+��o/��sU������8�:Ik6`!��g�7�桋���L]���,�)�.�����PG��Q<'�K�%�S�A��K���	7%�����`֮D2�pk�ʉua�}����m�9��T�NS���T:H�1�"� <W%�RT��a!܄�R�D+-���~m1�yj2�QI����S��et���4��K�
��5��}�)>���FRe�q�l���v�a���Ť��J��59�ʏ)�f�{["��<�(��Z� '9I(Bb]L�?}�x�U��b��_�IT�V��a�<��S�)����F�� ���F+[y��*�jt�7�c¢�U|�y� ��ڡ�u��R��@�&�Dx O�ALS�+�,MQ2�GU��@Q+��~�EHW��A����
ӗ�a��g��u1Τ���;?�Y�A��Eo�pg�R��Qj3C���]������q���*P�
��d���x�e¯z�.4mHtX�S�4-�w߅F�p�+�I{g�	�xj�[�$k� (��y����g��4ݵr�D�����Y ��Op��/Vj~.Q��J+��m�{�s`5Ύ>�O6�J`�1L��0$��׀lDhI��="���n���(B:*��#1SPj��.B����:;�k{��<�t# �=F9RF�$h�Q�K���Ӯ����ʲ����	�͊�߿��pTt����(TA�I���]By]���L$��a2r8`i�y�d�V\�MEC�.h�oe�8	�tr*)�K���%w	��u�(3�E��E�-	�3Ԑ,wH��os��+�2�Fir�g�=@6r~��\d�xH���3n)�I����@���V�P�P���Ӿ)��g��!��	7�펲SQ�U�gK���8�
GA`��<2Ngf���"	Y}��	G\������������1���͈q=�T�m������I��?zh:�U!��_p,���+�s2W��� U��"�s�W0-�KAQ�#��\&P���#�m�LI�/�%�楡S�&�!"����K�E�J3.�«/�&�(�����Ĵ`���|xO-�_�<��QG�T�H���L��9�飖��0���?m6�� bHF�      �   E   x�3�tJ�H,NT��KO/�,�2B���g&rÄ���L8}KRsK2��L9�233�b���� ���      �      x���ɮ�X�&8���=H�����7*�t�5`������Lg����8"�?��'+�-�Nx�Zo�-����C�a�ih�d�#������R���A�)��J\
˃���̡+"�{Ha�ye!o�}�9��IeI�
��������?0���FC8A3(�����ż�+��f��#B7B��y72tQ'��2o��9;s;��K���������9�k�E� ����~5��!�J8�Z��s�^=H���
�ȭ�O�CE"
������S�FJ�
��H�A�򆀯������ww�r.��ONߝ	K8��ɻ~1Z��!��殍S��ү 0�Ap�&�D_�7b�@|��J�6���,�i�J�����751n���S�+�@��@���L �'��e^�]�}ݾ���,��VC�q uQ����u���D���=�Io&葜+�*!�?�9K��c�<������'��A�� ��@0	S�����KS��&�)����@rX�s��/���V���w����'Q\�#��e�=������3�!���(�T��FE�!a��L���}��V�4��D�ʛ�̊�A�%aP�;7�P�������� ��A ��i�����H�"EP}6@L�}�ݯ�=��h�^m�JP�8�ˮ*M+��H�xsڄ���B~���Y~p��`�z�-�R^m�w��0b��I����A��B"��TQ��@����6����B��hm�/>�71��O$i��D��D��'������8�������_�S���$`�x=�x?���俻��V���D`���i�߁������/��/��F���o�A��_���m�-?����Kb�eа� !�/%�!_B��%�[��'B@�	��ȷ!���d�����M�I��H�_����S�G�?��W�C!��0��H��G2��v(`%�G���[y��<�����ʃ��<�S
%����o�A����w�Ca@]^�|+����Ny(c^*����[y��<F��/���o�A����������k�/�'����ڃ��=����_:����[{��=�[,�ʃ��<�T�F^�+���`�Ry�d�8���AYW��VWQ���_"�����B6�^��w'Ӆ�fb��CUf����rW�s/�[=�間3���]?�Iտ�`�F����Q0��4� ��Q�u4n��m�~�$���3����qH�c!#q��+��݋��z�<�3E߷���ء�}��,!����m�$Γ�ɓ�(��"�4�@9,5Y�9W��X�Q@�֓��$�ô���2!��6�ߡ`����8��� ��~����#Cq�{rf�H���q[]%�6���Y{����)NО�l=�Q)5{�7�A#��8�?p@���S[$?z���GeM���S��;	R~�:5��=��^{��:0�}�i������ a ��Zjɥ�~�/$y��iSkV���H�q��R��bsC7%I:L��;S\���j���&�C_�H"���-o㳠����x|�s�DN��7雌��Q F�����E9�P�&��{nE��y�;��/�R
D����� ��+!A�ܦ6��wI�t�=�r��4�7LQ�+O	�U�D����|��&0�Z�`��2�r"�<���z��!ia1ϦMR��'�n:"�4l�ͼ��Q�c�h�&!�/=$�M~�����i��N�  ���I��G,"jCd�aq oCˇLR9���a���s�����,���񡍧'l�_�X��4�m�lh��~�m0~���x����\�硞.TJ���Ѩ��w{����''����Ay
�i��������pIQ�Q�H�_�O���	��36>�BU�xR��F��&6�nG��SZ<����0(���P �z(v�%AU?r�^
pI�/�)�U��W���$�:������k�| ��!�Kw5z�I��CP+`d�����V�*'�p9�4xJ�2�w�@���6�2�DG���:�ۜ)�>�5�;��ո�l��nR6�,����.�ϧ��Z,�h)�5���i�ԁE��?l�˞��
r��{���ﮇ�{��(�/aу�K�`�"���P&U5�F8���T����3������	sm���eR�n��7� }�oN
��PĮ?v�y=�������L������x���8cac��^7�+�l�6&Z��w��0ʼ,-������=0q��.}�qe�U2�'u-g��}u?(��q�Hj��#�SF��g�ٌ�q��`8����]�|���n1�۠ ��ql����n�/�u��:���a�8jk�~���z�i��ove���CR�B��UV�(�,���Yp;A�8Qp�ur�
ږ���_�k.�N�Lq._ǫ 3pu���HH`�W$��_H�<i��~�l��K�?6~~���0�o=B���;gڄs��k0�Z7ώ2�0Jv��ob����+`n�Ŭ���N�m���?"���������:��&�ܑhb9<��v����Zja���w$ �c^���d���>vA�|�b�]�;V{��8�����Co�*J��{"~f҇��|�Ԭ\��q �������h�m�2������H��#��І<�h|�xɬ�#�JN���4�u�0�F�<d�c���+��w���0�t�$��'�_��K[����ƙ��I{�3�9[G±~��n��1ld������J�(@�4��� ���o��[�c�e��σa��_(����_�	R�*q�|����w=K�9��4��b~Wp�ʗh`쑷ak�a�r��g����2.�"��pd���Pg��@�BW��lk��
qG9���ongAB`ԋ.���؟�� I�Q������E؝�9Ue������`�S��N�a��ކ��AvÆ�3Q����^���~�l�
Hjխ����M0YXEjF�Y���Ҷ����j=����Ja���!��7VA��5�Ӻr�)9�=��+��Χ��(�u>��S�i綽3�ʄ4��>;�Ĺ�1�N�oy[�u$����<�0Y�eEaT�C���t��T>��i(�DA,��}9кx�+(]u��S|�ڌ{$[�����pP�!V&K��s�O��/�����(��l9z����2���a:��n��}oc}��7�G垾�K�	���H�a%�ב�A�,'2|�X�TI�q;!�#wv�I/+ǳ�RQ}�mp.��ɜk'����]eP��^�aũ=:������G�YZeR�6�>�n>�la��dZ�87��=��9	<��,'"��~��ͽ���J�, �:�b�F�t� ��\ϧ����o�5<��Θ�W��[/�5���]�=�������oԆA�5� ���kz4	 �n/���?��a,J�6K��|���{�e3�TMCH�X��3ƝͩJG|�� 0�%�̒&X9=?�a�ryy�&�O�:c~�s�[�2�kB��Rm$�#�Vj�:�����Q$�O YS��B]�ׁ�E^6�,�y�>�ɲ��w����B����e�%�Ae-�(�G�Ч�z�����F�̚Jb��D�dDl�,p{\����,��#���b��C-��*��&�FB�H��gg��Bt�q=�{LBMq��b���YGXXrM��K ��葔��G�ʱ)V�5M9e��x��	�>�&X;���v.�����[�[��p�ZSЀ���ZI-��mޅm��morh�f��M'�S����� �Y�'�)��ć���>&���3@�Ȓ(���(U�B�>I��ף�~��z��T��6>�w$������gW����iՂ����kʛYR��P�0��_.����<��^�z�����ΰ�qT?�'h,��F��fb���z�9:�I4��Z�c3��ݼɂ*�� ����#�H&�TF��axǶ�v��!��    q�ޞ�-�[�{	]�8ʖ�׀@ah�E�%Q ��ؠOj`�>{���o$(@'a����d�����Eﱗ��:�N'LEF�=oyeȷlł�y�/z����H "[p�%�R�6��n�*����|Dv���oC�h�G�G��TϼY%��[O�@FV ���]�N�$?R��u���#�}���|�6t6�ց#�-��S��3`�F��cW&{(Ҫke��~3L���xI��k9%��<>p(�W��P��tsv{�s���~=1�܎X8
Jq:��M��Ц�L�*��/&���[���K�`(nU�.G����{�)�z6�n4봹!�<�¶���Q�YJ�fW�7���Ԡy���7Y� �ίPK�NeW/�.���YV��tz��M���U�Ӹۤ)�q5�,�PaH�{��V��q\�na	���5�jL/a�ל����/�$FH�Q��A���X��͆?���Խ�rqC��۳ϒ����u\��4���%= �b����rP����%�9f�2�x����Xn�{���K�Z{��������w�J�(B��n  N�SuQ��|)���Bd��
Y�s�JIrmo�!16��>zӿ���<�љ�h������~C�%�H�h����J�v��^p��:|,/��"zHVB�cfc�pF��qo庘7�֋�i}��H���� '��������~�q N�?g�8�F>�W-�������cP��"�6yp
���~�����YA���u"NR����/�ƯA�s�N�J��Q�I�(̛k��,Cy�����z�L%����`tu��2��H����I$mWQ���
��:w�5QIT�W��/����u��k�r�����P��٠
��6c�֊ۏ�ݰ@��eo�$����L:�r�u��Ta��#",�$���.;;�L�-,����"���d˰H~Ĥ���,_�O0ې˻<�ڷ�
�e\��Iy���Ox�1b����{J��	�~����9-Rt]�>#��TP||�:��Y�5�+��ّ	���ڡ��BC�W�]���h
&W��,��ݏ����õ�r<�`�#��R%�3S�=�l:TA5u��޹��{!0�c���0�7g�Q��=�"+kgG�eɏğaĬ[���T�Ħp�Y�1��z�P��+��h�+��ߢ�qO�)�ݜPA�o�Y��	փ��]��g!���䟶d7�>&k|��՜��/�@�<�[#	��2�~̤��Q�����W���t��`'c�� �e2���DFk'o�t�v˹���9�~}�+~�^�](j�w?L̟Ҋ.�5��/��T�#Ϋ���L}h���;d*�Q1+���-\�� W���Q~n�,��16����iC� A���.u�����x��#�3_1�U���@S�1{ㆩB],?�ޕ�4�? J�R�3*yd_A߭,MRě>�������K�>�b�|Avr���Қ�-	9y��a��Q=�92��B���x�����w�տ�,�2(�*1���v�:�A��#�g$�C����X���hYb�m�4;���f�TԱǫ
u��zc:e��=�!�ZY_D�=�Rp��8~�
>B��>�"�8>���3?�IA�is�E
R����lR&ڍ�;cé7[7$�u(J� ��Q���H��瞸.�t�-){Z6x���ЖMkNG���)$w%�S��[�ł�y7�!�]YN�1�9�ki��8�7^���&O�Ԕ����J�G�u����]��V��+d�{�������VhW &/[�']�.� M�1�|;�Զ�x�q5�Dh�z����~�7�c9B)Ef��g��]%pM��/X0�|�10� {aɂ�XBR��;ෝ�7:O<���@�N����
S���<��3M�:�(�7)Yp��Xfi�x�.鳠�/����?:���xV��Eمsq���H4�8��a����n�ʧ�H�T翉	�N��c��Rk���`�<� ?�I���Z#Ŭ��˖��ȼ�c���8�^?�',R�I��G ����� 
4wl,������G_���X:���,	������h�����_�:��@�"v��)}��\��+Y�6E��]T/-dU�%�Pc2��靾<+�c*̣ڈ� ���|~���@4[��pfSU�k����ʂ�����KV���* �����RҸ�iRy�s��뗧FB��<O�Bj�D�IH�Џw�6��Uv�w���k�^
�6_r������V�y��7�vu}�Bąuhf𽓷d�&;�ێm|3ꌵ����=�qz�E0|I?���+�*^"���_0��K�-�㡹�6��Py����(���3�Z����F|��D!8�Ė�,��z�����c��hh��1�6n�ӑ�Ɂ7�ڵv}��(l҅�R� �а���w�A�~�7�%[�����R,^U��� m{��sT�\����d�3�z��{��1��*���icM�׶:���q��:K�`�F��x�ڲ $>_���7z�,�Nrhݑ��̓�ƜL�5�Ӄ����$���uߥd�(�o�B/M/Z��	�� ����E�Cg��<23��f�[��D��#)Q�M�����sj��>�!s���j�A�cR��B�;,�Z��$�?|^H轍�,j�����]jv�&������K�D���^,���3���2(�X� ��B�^�/���g�d@������N
!�N�),nV�g�������r1�n71�9�lZ��7	Р(��(!8�Wiҭ+`�#����U��@Td�$:\�F�K�3kʈ'
ǇbW��&�k]>0��˶��Ͻ@��u8�_���m����?ȍK���8�E�7�)3�;g@��8v�����$T�ˮ��-=P�0B+��Ю��s�
~~�"�� �3��\�q?����&.��n����PM_��$cL����Ӿ��FX�D���WF{�L�K��:�����g;D��]�P? ����������>_�h�H)f�b�G����P�8����9���f�pbɆ�+Qi�.i�:��K���0@D{W��H�JS� ���,_�w-&���D�ѩ�)>�A|� *e�B.#����[�0;��$O?_&�P�U��O��s�]�b	*�?v���&'��&����U� (��ߥ�E�?['�>�n~vC:��c�]�!���!���fy�N�$f'��v��g��\6���� !�y��®�:�.�n?�ZQ��c�a�"QA�IXA���T�)��ӱ����ѹ�����J�m����D޷l-�F��U�#�Kg�G 2[	��Lz9%��l��X�DH(�TLCd>ug%���D5ߕD*���5)���?Z�J	��G0�5w.'Α���^Jq?������0����zk����A/��?8(�*&Ē'~�M��0+O�%"������8lg�c����^��j��lh'�n�C~78Oǋ��#�}��@�ɵ!zͼ�ͻ.O~�,h��7}BS�+�e�Z�2h`κ��g�<�m��T!Ws�oS8SĂ���\�P$�J�t��z��o8Q����ҏ`d��G?��4	��k��AnܶD�0���V]�L�bUCzgC�w��d����<0���Sf'i�/�+3`����u�qx��������t7=?�ۍ�bt~l*��yqִ;|c��P�T�0��B�Y+r�<�`�$`��"��F��h�ǝ�n����8w���K�@#�yD�Q�m�{�����00�����K]j�?bP �	��#d��4�|�0�����8>��`�CbL��#K���t�4�K�]R����+�Y+^��$Kc�5��T$����@�ϭ�,� *���ч�t)~�������V��;�Cޏ��������0K+�:
W����ԯ��O@i�I1��Z}X[oN�0q�SH1��Y�"�~�:�e��	[��� ��� ���gU����]�婮��w���ds�T��I�Y����.I�%��|�Խ�x)�H��ŕ1I��b��Xh    Y;ݐe�`^����"��}������>�����T9�´���O�\��q'8�@�Ը�N�-:;ޡ6v�o��7�]&���Lw��E���lX�����o"k��^��x��ly�.�:��d+�Y�>�E:|��D!`p�wݔ|��_�Rh����"P@��tI�~TT�����Ʉ/�q��h��\�һ����Y=�6�4w�om���.���_���_{M����u�@r��*�XFƂb�7�^�ė�z���*�o2��T�L~�w�ȐJ�x�2Ŭ�#kh&c��p�J���T�=���b�F��	�� Nmw-36��`4y`��m�;F�[H�}I�2��20^�u�����<���@(���;MS����Z�JI��?���u����QE�o$�SRkg�S_^������$��)s7����QG��z�|�<�O-�f�4��l���mI����l)��>�%u��Kr_�%������������*R���~��D��&�^\���Qky�����<�f��G���8
��wO�2����h(��.��P��g�./���dAm��l^��ɤ���z�AH05p&�����H�ZV����z�俰�"'�Z��p�s�D��ᑦ�
r�9��2��H�M�pA1��v!*�HF��a� 4C��ܯ�U��`�V�lh���r�;���*�`+u<���S�J����^$1:��,5$�pH�����No,X�:��:����_h�̱Щ8U�G�9l���`������f��]L����\��1��ot���׳D�kB���z����PڮF[�|4H�T��.�&�������thK��)��1�/��1�]�^Ư��P)^�8�����,Q]p���e�*�3��ƻY0�|J��c�f`[|��߯�C�a����D�w�r����ˠ^�5��G5 ���p�(�ȍ7aT��0�1Cn�E^.��	�gۃ@·FĘ�|7-4��+d���g�q0'Ki*����?���w����'�&;�%B6�XH�u#5������}t�ƌ�׎ C�w�@�4�҄e�ji�{E�u�,�'��2	�`vݐ�1d�c�;�~��9Po���V+Nt�Y�N>�����ً�r� E��l��B�D�v)�%Տ�K�$�n6���ޚ����COS2'76ζ�:�ϝ2sK�;�:8�B��)��b��9�$�����մLN}�re��p�JN8�r�.;��$aI#�A&_�A1t�	�>�\��#"#�7Q�_�k���Ur�|"�@P�[����I{8��K`��T���aN�8�����n��y�}O�08�c�K�N���%�� Dhۿx�?�4	����Sv�*!W�4\B�S#`����f�^���z���ؽ2����w~1�g����i@������t��g��!��P�jt$����.�G��^�^�\Wp_S�s�N�.#Y����q9@� ����-uQ�t{	���C�í$_Rf�G���S��7��7�� >�Ƣ���-�ϲ�2�Ŭ�|-mh�(,=��}D#ܩ�U�K��D~.��Pp�̀bawHGL�r��[nl�����
 ��yIK�t�\~��͋����W�([!���1i���$dN���F_��,^)M��#�>Y���o�nA�`oҲfQ빸S[/Nq�r�/���-�^~�a��2'W�3!!nҧm�DOwNZ�ԟ�<`����o
�P 
Y�.�2�ؚX�Y��#�7Ee���F��Z�͓���|�$	v��>�ZQW���_k�!����;8��,t]ˤ	YhB�Aן]"J#\0r���h�o2DyB(�_�桻Fj��᤟�w�`6�~s=4F���e>^�-7��� 0k���G4$Y��T*����$W�+�-{�I�������Xv'�=�o��a�]�Y��(�%������A��)$r�X�5���)��9L	Ag�����䠝%^9l)׳��f���o���F�kW_SZk<d%U5]Λ&���ՙ�,�qל}!5��'��I)����{�bD���Y"U�D/��j3@(?���2���/�,���_$%-��χҴ�E5�NCc�8�I{{Ȕ���5�Лn��)�^�\r��廵E Mx��eN[���#�T���G ��\�W{�k�Z�\��yx�d��VNZ�<s��ط�y2�� �Q^�,��~k�l��,�k�6�I�ť<d��5����i�@��"�Ib0B���w���m����<�o�����2��ZٶT��mo�g��$WLS��*�V�.��<_��W��b�ϱO`^�P\np�tjv��>�b��m/cZ�󷧡�a�"�s�	���pG!C�vV��
r��Ψ�L9G�!��SkA�hf�nUP��oIY�l�*/�;WI���m���y7�ϛ$̘��3�/��\V�>�H?��Nƹ�����͑`���Y����P�u�J(,+Ĳ�s,�Z"���BI�c��R��v��~?��I�G�S��Z<�=:�Q[�5����-�pd���S�L�d�/�1/���i:�L�9��`�icS��M5��6�د���/���2Р�j!�0��%-� �J�$���"x#�D�^���:&����#7�D��=�P�rl�݃�;,���X�Y-�z��	D�q}To�y���<]Y+F�ŘcZ�Շ�~gW�sd��eDTĻ�����q`����;��i���ETu��ҷ��9FG5\_;4?�<u Wfh0��r{'̒��A���;j���}����˦��~�\��\�?���tG�Ȇ��D�o9~3�&כT`��{H��e�.N�$	�1�Tvy��_	�B�@^���m@۪y�QX��P�!Ϲ�V�L�:_��E�M_tt�z�PF��&+�dn�]<�e 
A෠,�\�ww�l`+����(��b	v8�<_�㓅!�q������Li��|��c���?^�0����w��.K���bqK�kq�\�D�nY�S�&�6D�r�"��� Ubte���|K�cJ�դ��i���%R^���p�#d�o�ѵ6Z�+�� �y�4��|�IC^��>A�S�)O�M1�����ERp�y�Tz$Ջ��I�YZD�A�>��m Zo������Chsq	�"�j����@�?�[J�nk��̬H^���U��y�J��>"����1YW������r���D_��.失�ش'�^�Y�
}���o΄@(�E%�er&֌�.�����N��G��E��y����$g?8A�||̂�BÅ<��+>�A��03n���D�k#2��a+s�A��tu�Y^��O�$	��&&������F�P��"!}*�ղO�p��<��9?
mS��Y���
�k�l�
�W쀱�/yR|�1�ֹms�:
�t:���
��5I�����ꢂۏf8\�x��@��H���:d�����*��>���2���g�������{m�Y�Ƒ#|n,�r5O߲q `,�{��Bn���%ڻeSa�Ͽ�=�t�M�����
H�t��M_���F�=�\M����FZ�=�|]T�-����.d�Z�_&�`uð�ײ��b(C�(=Q��HO�,1@�5�ó�� M�F��ݖ��v���wM�̬�̐��rq)��[�k�����O�hӎ�ȃ��A�v��14:�������P�=5�����5,$���e1��q7�|ɗ�mK(�v��T��Y�Tj'|[7��x�m:�Q쨧�'RA�.���x�`E�12�zw� _��kX���#����z�s��wO7 ��0]�ԗ�p�R,�4Y���C}�~c	X�V f�|���K��*g��ʝ݈��S^*QOqd+������e���SB�D��x��F�M�A8�ngG�Y2b�2���8x������o[��tM���F��(8o��ɫ6;zJ�>j�����"�-͋��TI��[V�Y2f�}��b�q�k��K�vO��wQI�VٝH;�.���NW��.�i���P���N�9�vC�ݰ�    $���F�L�ak���^�ր�D�.�h�xl�J����&�L��k��A4�?;$�2�>�M)��g5(p/���R�� �����BlgI�xFW�c��Έ��v�}gQ��F���w͉������Un�n��
���+wI���[���πIu���ĵ���˂�>�ꌇڅ-� �8q;�]^ew��]�e�����0�
�W�tY��)J��̚�d�q8�Q����'-�J.�Mn{SVk�Y��b��������w�Fa���2J�玢,(@����#�l<�ǩ��ʜ��j`&��sGd�FN}υv�ǲ3wH�#����h�[t�6�!��m2%�y�*V�DB�:�3�P�磹	ä*玃�ʏL��O3L1�D����~S�e����&�5(�e8'��}����P#� �̑N�D+�+p����9��%��)ƾTE�t徶1b�l�}�Yl-��f+ȗ��PE�0o���ԑ�M�R"�\)�=�.]}�?�|uy�M�ͳ'��5�F����:O��Y�nۤ���b";$�M�=3K�aݵ���$w�����Yk��I�G��^"+���&)����!�wv�
" �2��0)�©�ƌGZ�"T\����d�k�y���Ա4�)H���v`o��hj��P���V��k�BN�p�5`P��b��dΦQ����&m)۬��*�����C�tF���̾њ�Z�����}����u��2��#�`~��o�\ߎ�Ê�a�Zbq߲'�����gW5��U%6��.�S�[J�%+ks��w��$>�8���<SgF>�A'�bMÑ��W4Zf���욣��̕�T���dp@�Wg�M��b�-�~^�/��|BR�j���3Hr��Qz��� e�e�)��Ї,�-^�GvK�d��meABb��D�.�u�P�,k��]}�\Ȁ����bԙL��Df����-�cO�]�2o��i���G��eYw����8��� /��8 ���)�b�D:d����g	���n���A�Iz�N����s�`E�S��f���23��~���ʗQ�2Yf��`扂1����3[N�"��eq�ۊgc��U���y���m���[X��!��@q��)������G(����'op�)x�۞ռu�x��qwQ��j�Upj��m�?�o,�Bk
{#É�X��AjiX/���$���dC@���֘I�����D��{w���&D<�ag�h��ҁ 	J�+�22��3��y������z���e��]��]#j	��<�`z�v��a�y��W=~���F�Y��Zph�\���ev
Y��y�%?V�4Ft�(g�J�vҒ]�i�~P?.�>�p}�����T��Q����ff$@rW糌M���a8-+	�e��'$}P��D��|��B*'�k[xBzP�e(-^�V>j�a�a $��3����{����ϫ8������>�"�ռ{#|�	��%��*_|mf�æ�[��=;~�������# �
e��_��|��@�Ԥ���g�5���<R��a�k��?��"�Y� ��ܪ��d9f���|��#���[f�H�4w��m�!Lڏ@Nv��a3���hR�4Q�wϼ���pD����kw%gI.O_�D  �[���EV2���YԨ�L6��:aW���3lVh�&I�$�����e&0��[$�兽M_�I ��2N����%����94q�՝��GÙnw�ܶ��H��,�02вn��|��Sx��B����_�zgӗ��w��/jp?l����_�á�8���m��9��w��w�2�)�S>��F--��=zO����l�]+D_#S�a�@���O��=Q}��[��t����:{ux��v���� �m<Cϣ�����8���eA���D�22�^#��U����$�'(څ����E����������yOh�}��4:"�3�#i���q������� aC߹�׼Ԛ��^��<��e��'$�h�����"�~���K�"�P�q
T?J����V�bW�������N`,�R�:G�|T L�����e��k 0��!��g����$w�>)t`�;�Xr;��Fm��v��%������K�`⽈]&��u��P�E���m|�ngb�i-����:�:������T�o~�nz�
*�}�5ݷp}B��S������Y�� Z���Ft�wq��U_���0�3{�f��q��`���e�Ň����{���K��M}Ų,X��K�ُXw���'�R�<1��ze�&�D�-��r�y��5��M�$5��f�໅�
�S�S��o�U��8_6�m]Y�'}�42�/LjV�,M{5y�>�����5'�ۃ����U�y�����grg�z�ϖ5�?ۺ ��#��x���Td]�2E�B��v%�B�0-��#9hc���@��o�b����k���3��@��tQ��m{¸�'��B�-dph/W�nHf��J�l����e�3|7/ ��5-\(��})�m�_x�g&��u���a�X(�G�CJ8>��o35m�C(%op�<��o���di�z'ߒ�ʖV8)o����D�#����eǢ�=��O��J!�6o�	=������:p�c������N(킶�c@'�w�/��0�.0�p�|����mY��+�=�gu�}����{�����sf��[t�,�eZI�2������.�?R'�A��3��on=ܝ޳�usad3iN�/�Z8֌p�OfZ�uzVj�Ƹ��*�B��m(�Z����,y�����	���ĳ���8���|�j���=n��]Gm�T��c~8�ǻ�ۿ�*@,�%�U�zyG�]t�_|u�DC�D#�l(����E�߱���$���;+�~�h��m�x<�q�F�O��@�?�iȿ�^�+_���W��P�0�e��O�ہ��ͬn���9�`��̦5G9�w�~�ZQ��؀(�M��).z�ޥ��?bdK��G�d�b��&�#�Z6�8�m[�N���Yf���/�u/%�6H��w�O�H_#�e�Y�ݼm�Y 0�#�,+������p��T'����8�)!�;���eHp��&�~麼�W	}�_F_�Z�~��'��2��		Q����w�䜭j��v�_S��CF|3��D*�h�ͱ�$#��� a@ ��F�etW
���K�d���Ƀa�o���I����86���|�������w�s7&J?A���$8�N�.�[8��^���<},-#��H���S{n�cv��#;S�X����J
�#S���&;���2~�<��C����Vx�'��r����HKM^��y��qL�瘛�>9������RD��]dI��զ,�[$�n`��^��G C�J�doKd�g���)�dOU8���`�>U��YA���o  $��V���"�J�urs�}�r� ��x���C��MhHMr���]��2��1�ٗ�޷1E���<��m�$az5m���~�ٯ�P5/��E�#6d+/�g��O깩�9�R��6�0��69�U=.�VH���ϰ�$ì��by{����G�~��H&w_T��z2�ք��S��v��h`'�ΰ������s�b8\��u")�O#K��E�m��2n^D H�lQ��Y����t�涘������/YZ[�m��{�u��h
�R#"q;� �R��_��}O,ee#3"#39���7z��L��	��b|�=4{\��i.n��!
#�y|��� >���3����,ą�l��bET����f{�X� ߼�ZD��9۽N���t�HU���EM���{;;�3V�޹���6�$m�U^Ȧܼ�,9y�9���T��#O]K_˱$����4�g+����~�*�C���{F����V���dȎ���(W���e٥a��`�����6C�����MӮ��s��/��i�7&��r�t^_��@��>"h-�Ջ'�������Gt�"��\�'����`��L�^em��Ͼȇ.����Ѝn,�<��D    !�E�ssX�dc�hL~,Q����%G�	�41O˟��j"3 Ui`p��=3�~��_"H	.�� ,�^�P�7Ȁ��l:QP�Z�4��,������lQ�K�F A�S0�Z�$��o��H���A��2��1��.�ll�g_��6���q����\�8�د.p�bb���˲7�Q��%@ւ�����w�#x/T��$�z<����{�����~�E*�W���u�bss��X�h���G��af�*ｂ��s�MJE�{���Ą�3U���\]��T<�C��v���h��B.����ݲ��(4��])�֚eO�ǉ�[ԋ�8nF�|s%Z�lᮽM��@�)̃��S^��E��,�J�)-�'cz
�ڶ��%���t�!L�*�?�^�r4Gu��p|����|D��b��
KȻ�t~�	(��/�z��I],��1O��д��翎Sg��&J�y������-��W�+M]�<��V�Z(?�}@޺q�|[�wKmb��H�Ԣ���������[h�������"1�ͺf4��k5	A�2�9�y��ڒ�uL�}��0c|?-�@S�����1K���?J�F��-o�MNƁ(Z;*�վ�^+��׏aiX�w-O۲� W���0��r'��Z��~��.�J���F 
�MHMiߘ6}��ڊ�5u��Y�@�C�y̖�Ѷj(6jmC����Ő5� U�&��6h��J�;�x[���t�� ȁd{�jB}%$����J5܏)~nur���D���dVF�yyP��Ѵ��-�K�q~cv���F�Y�?t{" bI{�B����P7R��F�UHedYh�7Yz� �cL`�?���g��ڽ���,�ގ��)�r�}b`'�F�������BZq;n1$��~��@0�{��{�ˤH��= &�Ŵ��Fb;�xW�̹ctA]|�Sl^��ҏ��fMB7?<l��]zq�1�2�"@'M��g8F��^ ��#��u]�	���o
�x�˃�,S���$�ԯԚ�<X�}����z�E�����:��������7�݆�P6��m���k� nA������JL��o���W��wϥG�����=y��8��]�}0?�ņ�h�7Ux��~�2m�Q߸�M�w=f����
7�e�*��J]����{� S�J]f����~��@P|gб���_)��z����^����d�h�r�����	��\���q 053�0���`R��sX�=�'S�71
`���%��1{�4�~���xe	���iQ�,F�͸Xdw�XƼtbw`���M�mt�qR��i[�s�F��/��M�W�BI��cȲ6V�@��+?\��}C���uEƴ��� K;����  �k�#���#���I%��B4NT�V�J��#�:�r�z��-{{�ĸ�*��U��u�`(����a���MSB	
��� Br�v.�\��?0NfO��}�~8�I�����N3'��w�����Z�� 	��"Fvjt��}?�bf#����>���8�l/֜��^�n��+h�Q�W���X����K�
r.2C��'i�V�+/����Nn�.�딺�'��5�� f��'M,��H-Y1�Y{�mg�tA� 8�����i�؀	n�y�M��˵��G���W��FX��Y�)�[��*\���u�f�D9w�|t)���G��Hb�v�����Ϧ����Sn��<��z��e8��|`4u�c���~� F½�`I�
�=�\\��F2w ����=��h��c�QV�g��Iw����U���Bڍ}<���nWgUtH���,�9�Ů1�Vc��LX��>�Q������>�x���2�=w�p�i>7�D��D���?Ww�8w���\'G�D���`c�6)\bor�/�:ܠs�9VJ��ƨ�ڪRZ���˃5�m�ޣ�l�$|��k��R,L��C�Pv6�L�ve(Gg�6c����e��#Ҩ/PV��(���L��+�-,������2����Mj����c���,x�<4�۠�~�|P�析_�<����/1��.c
XB���^�V�i����oh��i�?��C�ly!'���c��4�߹��P���P_��J���rb�K��Ӧ�"�A�*��F{g��FGC�T�P(������?z����k���s������~�:�P[�E����ٙ��.��l�(gH�n|�������!l��ى<��2 D�����۵%����ZM�����+��٬�U���z��Gz�U�b�/�#�����Bق��.��_��~�49s"-�q��R�J_a��pP#H(_���4�{k���H��zl�di���p�����3F�Ӫ�1e3V��R��|�YA%�#tm��F.�m���bӈ#���֮OBmn/�E�Dw�+�������?��廀`��<���l;���eWP�#�>�k������VvC4��&�S����D�4͗_N2s
�,|�� I�����c?LlV���g�x��<n�{z�OJ�ŝ̱nd4G��>��%��=_�0@��'4`W62+�6% ���\C���m�*��*��"\�ݣ\��S����>��5�;f/�NO��`���$1�f�a(E�~)쿏i����v������1�/0E�F��z����m��n��qA�� �E�g�pm��q�����K�q���;9�yScߟJn�.G/���|c���@���["5k��e��!�Ӥ�.�S}R���.���Oz�/'���|2�n��qe8&!5��X���4\Բ/�n�K{BK<oCґ��|e�p��mm*fv���p@�]�#��L"��K=�m��t����{O���zVD��C��A��I���/m�Ϟ��r8D��5Y�`�p���'�[l�Q����n��g$0�������p�1�5�0p�v�;2v����r��*��d�����O5�`@ܢ'��.���Q��l��P�K�~8��@�{ƞ	\����$�R�Ӿ4��.��rc�ܭ�s��11Ӵ������1���s4(����REE*ꥐ�9�fW�o<�$���rL�=�*OZ����]�Am��ew@"2	?b��O�2��#y���;�J�<fxW���s�� �� ��͝�]B�%��������]6�$5&��R`�D����Ў���_���rs��Xf�gϔ���n����@�����@gx{T�U.\y�ʓ��/� �_"����d�e��h��
������H@�'� Aj��O��+�Zx���J/�]ں�Y���`1���I|./`o��iz���g��g�=A�`�J�n���,�3�G�YcUa� �ϓ�� �5����[j� ��|���[��{���e\��/�V�C�O�Q���t��>��i�➺�N]����z��){Ņ,���[�f����M�S��.X��\_Nf-��R1J��"�l��w��I�~�K�dtu���9��
z��3��٥Ƙ�o���
�:(A��E���G(�����93���}����kȨf_�*��F��!����c���_N)���P�ȉ�ė> U+��ot�.����u���~muL�k���P�G�љm!*�X��I:,_��il�/@�{r�F� ]?����3ó�8C�M�6Qa"=�c@t$#�`o��ع���?�{�l�h��nB����ջ�P���J�/��.p�h)�PԆ�Ɛ-��ҵ�U���	m�j-ط��L�d����}hA'qP��'ڹ=�?�]Gɗ[+[�= ̺3���ur6����)��6�"a�'���ּ�^�{eר�%T��9G�2x�/�R?s�R{x�+���9x�I�^MsH��U��K��}�9׵�Qy�l�VEq���JѣU�<`�1s�	�9'�#$3^p!�̮Dm��]LS])��H]���0
�����r���
n�˷���YVñ?Z`*.���?>"��&������N��l1MHIjΫӺ�Q�)Y:)Y����t\T���6�����w���`o�q�|AH>qa�����|@��̦ ����Tn��DVly���� Y-��% f�{    �w� Վi�?��w7f�������zE�b�d9
��i�����E9@=K
�z��v�{,��}.;C&��{Ȼ�֕P�ʲC�_,�%5x���W���&�h�j����"��l���We���&��b�1���ʛPF�F�`3ڱ���Ns���e��Of8���;T0�a�A$>�۳��)���+p����C�9��oB=+��n��������K*�4Pp�����ؕ����[|��J��
����d(�G�,?df��p�۲� �V��ld���d������k����C{]��h���
'Ml�nưs��zɈ��G��Pマ� j�ܰ2�1�/�)�����˖w�ɽa)N�GFq:�rS9��)O����p��L��4۠�A�Y
rI�d��c�\FLM�u�L7qՠ+�MM\Bnowwj<�d�ئU_Bۜ���ƛ�Ax�;;��������� 4c�<y�I��}6|
��c��Y�P��ƨ<9���ѡ�RiL;��ۓp��R����^=��=���e�o�#̨iY�؀	`He��ߢ�]��7���]����ܻ�<O�$)m�&��as����Hy��?>���`u�y�8�o�������3��H�!���n�M��}����x��>����N��$z�i��.(����:	!0�[�ܲ�W �����3]�����T3ra�_�]�5�?���]\�:ִ��kC���A5�Y���%���)��]۝���tՙ"�1����vX���4)�{��m�&�j��wV���!�gI���,n�!�Lw� Ō�&M�1x���X��N�2�7Q٠�WC��]e$MQ�|i�ש�\��M6�?���%�7�A1f�J�ٜ���Ou���Pp)��y�n�ڿ84���2i��xY��N�N^G�Pu�3�\,ÏP(��E�1���|W?��Vd���/��૘�;��>��0�y�r�Z��%�b���$yf|��Q����3gE�aFM3�`]�I�Ӎ���R(�vɒZs�BF�tS=�&w��9=m�z�m�t6d�ײ�9?�z�#�&�0��atKS7m���\��`Nض�E������M��C/f�I^���9CM����"�x�^���s ����tN³��#�@'fj�~�R:�i�<�^��'��wVޜ��W�Ö��'զ��o<q�+���:�.�|6`�a2zz*��~����2����F������+�4d�>4��g��B�f�J�'���%�uw[��=���)qrڗ6�?���b��X�@�Zd��z`��+jV��V[��z�����u��1���O%�YwD�Y;���v��_^�:?��l�G��ڶ�жs�c]f8M��Y�(�4m����jgpKi,@2���T�d.25o@�&v��f\�QS��@�:����"@!�#N��I�c��͢I���
3
t���gBz��$=_c�ώ0e<�����_l�$yc,��H��⻫{QN�^���Ŏt"�vDoZ����D�uw�˞C	��?ҝ��l�8�{{��ߞ�G9Vl�Bq�@XQŽ�W9��� �g�R��)௔[�ϕ�^¥�f��kl�x�������"�syO�	��z�6#�\��5�:I���\��>SD`��r>)�\�����k߀r�L�h���Ek��<�N<jE��a�{��'Gh�^�*̾3[��9Z���y��Q�C_���/�oύ-@9c�_!(��~$���3�C�k�3Q�*Qσ��C�n�Zw��#[I��z��+���J���P�~�`�� ~K��kZ�I���%�1��+鮻��S���:qv�פּ03�FI[��0��a#��$��Ȋ������.���٣/�m?�V��E���`7Nx9��w�]�?��~�FL���>t�����P��o.�ϝ�I�]��U&��rU_..��~���dκ:�|��ԧ�����4'ϵ���s����~�A<"!w=`�zFNݵc�A���܁����P����ܹ��7�*bB�ݣ�l5�ա��!�yF���:��Bѹ��g�TZ�7Y��~0Cc���}XK�� ++Q5��3G�3[�����jo�5��܇�eK$Ԧ%`����m��Dʛ����|]c�1ts6�fhJԪg,j���䁀-�z�8���(�~�H���\��3���Y���K���w�R�U���Ͷ�Gʿ���k�&��9�G��,�r�/�r�@`�o9�Ϙ)#X�)Xmj���W�ϛ���}�>�ɖ)�U�[H?=��	ÝL���#�c�1p�&_1-T({LW�6��E;)�0R]�.�,��}}F�P;*d9	� T�k������]�:4����x%8GAh�~�[g�=�K]�����l4���j���4��/�ۺB���E�}`rYDc�0�me�R�X:6��=�6���Tc&�,�n	�s^@��`��׏@�28���ް��FEt�=m/�w鐗�p�w�=��!����Vy�|&$̐�&3P�f�����l�G:A�R8N�2t�ϊ����9��[u6���M�E=�B^�<Jo�����DHlNfmր�EAX;��/PvR{�[�1����W�ʀ!�n/GH�;�9������^f���q&6�b���O����M��h�j�O��%ic��)n'��S�e֜V�G+����p?�3ڝZ�E���{|"�#oC��&I�_���xp.^7�V�&�5ϲm�\�8��P�Hs;�#�*�k��CG�O�F�^kn���c�1�%�b�[7l���Fc(,G7*��O?���ђ���z��bXa�!s���7��_^� f�P{�$R�uǴ�?.;i��aj��!���[��c�v�}��|�N�c+Jq�7'�O0�������l~䶻��J(/]Foá�!V��ft#u�4d���.P�l7Imo�f{=WǾ"���k���T�9���m�]U�d��x:'�j�H���e�D� E{��4�-�y�N��3�cm��������*e�@���[G=�p����ŃJ�n��n�QS�03������q�3z�	�/O�=����#ʙ�(�e�f@0A��Q
g9hM�FG~����؅"ax���[�f��(�r�����3\�	Mj}~�u��®1/��4�
Vh[�j�%ό��W,6x�b=�����ߓ���e���9�c,�N��֗-٭��>���QG���8ƈ��N� ����X�Ǉ1T��eDQ�(�4�g=�1O���������&����\=;.~ ��^Zv�I<�}(n�"(K�����A�Cq�����BXPӘi]��x������ǗS��*�\�T�S:���y-���y�2���1P��y�SA�Z�_��ozL�� ��g� ��F?�[2�3EJ�e�0m!Ew"dl3�n�8�x�*T�>�*޾�슶�U�-�%���� v�,墿����̿����x�sw?xǢs���(=���=3����b5����y-
[���	�3ȴb5f�t�^��hη�b�����p!aC��l�;^,�BX�`�O��(�@�쇋�C�s��Ә��@�����G�'v���54�L^wB�ކ̍��=�ڡ����Xc��C�#���"��s9��U�|{x��o���%�&�i��Do���}9�͵�[�U���+:��ٝ�/{m�o�w�W����m\T;�6BA�ڒ	
`OJ^ 5���.��W�[!��ڜ!o���|���/"�b�^zۘⅣ��/��xQ׫�r:��ؼ�	d5rJM�q�4%-������h��AYy�}���C=�Q�J7�잴R�Zv������	���GO��`����7����ϱg_ϥU���18od�5�lO��r�?���9u���{
��	:�Un0����?΅"��U��>���$�#�����䕄;挨z�j��=9��^��}~�?S+JnU�m��Q�L/��z��Ԅ��U��C���Q4y��?B�zv�[̔���o�=e��V��߷����Bĭ�&j�a{���J��8����@DG��Mک�V���<�_�!    �� m��]Cv�ұ��9���@�)��ݩ4��R���`��q@U#�5'��}�4����E��%oX��ﴳ��ZU�d��V�j����#x]�;W^���#� �|S��!��P9���7ӂB�������v]l�'HÇj�ܺ�^I]���I$Ԁ�vuD)r�ʍPH��%8 ��ļ��O ��5om(�l���B!����֚Sh_[iu�~S߰�j[�m/K�7��̓��錉���:cL��G+�_�Pc���?�Z)��̆X���	yM��z�+��Gn_饪 &�-NNQ���T��]��G�� o[K�1��l�����3�� ��^�d��#�?�<�7��W�٘rqs�E�i�>q��u��{(|�NQ�ŗ���B\K�h�w�[?����4Z��u�bF�V�"���&��������`ԼL;���X�gQ�C�g��/,��9+1�|S�j�9�gl�	S[	ݝPiunN��Uz� VtE^d�X�A�� ��y����1�����@I�#LV��ٔ��()�p��Ȇ����\�=)�Sۡ�mocD�=�8#:���yI����R[��ʦ6B�`Bê�m�&"5q5�0K�
���!��1|��[Gn����F(A�~$����O�^�Oz���lC&�j��(]?b<6����.���Tj�"5�U[+��'q�bJBA(L�S��5r��]�6m��3�z]V�����z���f����)��܅<�J=���&����`z�s閿�`�ԫƑ��h�x?���>Ci��ÍV	�-��Ǆ�.��S�� }����򷤿K���w簨�XX~�(���Gަ�mb�,,�k�0���������S�	3�<�W�Ԍ9��1Z7W����]9<����'OY�G�P�	�k����-������ �g����I��[������ǩ�X�&���Y��b���#)�eT@ce�ؗ1F��|m�^�����}Ĳ�ݢ�׷g���uT��t`�R��*��t����
xxPZ~[v�(M��|4@elb,��.�{���/�N[go?�����P&�}+O��s1v���hh<'$j��[���1��>#y�f����/���ڞ/6��Qj�����K���l��	Wj�+}���� ����ī����9&���MX���(cZZ�_�ξE� (J��!���vёk�}vr�R\%��?Ÿ����8�l�>v�b�6B!��3ź���O��ޛ�j@r�������nM�]&�CH��y��R��X�ӻ��n-1؆7�^�=��.Nh8�(k���Ǟ]��@]�	}E�Ԧ�,��&��5wS�"�;G������+�l\.��E���i��8�,һ��|�0������3��o���o��G���5�ŷ���#�����dxV��=�~��O��#`4M��<�ڷ��`(��p{w�.��g���`^%�������6^KR}��0z.%�#t���C+�9���j���V�g,m�݊�~���~:.t��k�����p�@49�4�1M�&��K���L+�A�sLf��!��8��o��ƾ���'��	��������:�^�3�/�^g�+-e���k�9,�j�"�iC݈�?�끚ȑ���岴�3��4���wt)���N��=�����A��Z��{��Ίɹ�����i�	k���6�9�������T�B�
�r�0���EM�)�)It�����c�����ٲyӐ_��jؔ�=��o�H�/@�_�o�T��t>��������S��N������χ,/��6��
l�j�y���]��FcW�!�5o8�փ�1����y2@}B���{f����ZJ�R�eD�]&�(k�4�����`0@�}�4kǉ����zj���V�sx����|�"��S�Ķƈs�(�i!H���!�d`�ˏ<��=��9V�y
�t�`�q]GK�����>�
q�Ésˣ�ݯ��ς ��9,A!�\8�QT@T.�������)ƅ6���!A!n��_G��}��Ǟ،_Q?���q����pm��\(��� 8kc3]���d�[��N�o�:�/���)�wh�r�0���=\���\l��}&pG�=V�V��p�D�рp�����Ӵ��z�썍�T:~�+^��ЅHL~�\C����pi��,.-�.�#�����,5��] �#�7苭#փ� 9^B7r���!yw-<�7<V�s���w����
nT��������J8 �!�p,X(?���v*z��ɣ��W�>�b�6��)g����5�!�4�p�`��4y�d�5I�sS�5zڷL�&��w���Sb�L�^�p�D�x��|�\�h�)Ån�EZG�8�<t�B��<����F������k�4��A��gt�oA����օp���bE�L;F�k[ɾ�5b�tt����O"�[�L�ƻ��F��Q��W�L.�o ����:�YI>�5ջf�F���'˽��60Ǳ2L`q
=;�_�D�y�/�6u{;KAU�

~D��9�o��)���7��v��1����;�U�s��"E�	R@󘞺�`��M�[�����Ɏq��Wŗ�d	���^�J���r��=�!�ܮ2N*m��<ţ"�B���wɼ�]���(r��wE�Y�qAư�g ^x�:���Jܢ�9	3*�G�Ȇ�1e�
�c=�s�[�9�R�qB�0>'�aC���/�ow׶�)��J5\4�˖4�P�<x��n���`�Oݖ�jO�l/Ǻ�26Mo���Lg"Ք3v����)�[;B�lt'W�=��IRs{�T:xJ�~3l��';nB���!H|*� �9���ES�����%8(靹�(�o:��-��5\�禷ݳ��!�ظ��5v������kէ�K�	�L�{��~LF�oozG�
&q�L�Jsu��HIS�m�8�F�kEb����5ݶ�/�� ����=��D?�F_d~��KJ�R�d��]��?����_�&y����l����.�Q8��R/x�B�$2!0D��㲩�#5����![��XTB�;I@���E	����%|�$�Q큾��RF�:�Iј���)@䗘�p�"��c䃕`�4��`$�1��ؤ�N^{\I�6$���n�JݯT�>n���.�Y�>l6����Y=����C��:��jWJ�����;��+@�l4C��ޏѝs�ƀ|
��g�d�^<Q�=��W���AIfzӀ�F��1�������G�����	u��5~�M����\S�����{�b�D�}kӺ��vQ{e��3s���
L�F`��W�¶j\˥�Q׽+è�o(��CZ_U$-��zx���
)/W}����'�q�[ç�wL�J;���ctF����!<k��a���}��b-0"�b�.�H݂r��Jc�]�l��w��QdnN��Ѧ��������CK�c-��=$�B�5G�}h!���:ML3���Uz�D���a~�� ���i�[��Ԏ~�&���`�=q?�Α)��`e�3{�BS�N�������Tbz��xY(�lK�1�arNH k�.
_ڃg�I�g���d�,1����lJ�N�q���G\�H�������F.�3n�k)����|Y k���c:���߂�[�O��m����-SQ�("?v�e�ë�,���Z"lqZY�N�<t��hƸ��ϔT�L���rEU�g,o��v5��P��g��j���
OØ1�����Gg�]�zy��V�`Q�s�B��ڄ_d����l����1���3����5I��ލ��j@Ձ�
ZY���؊*�[���]�r MSj�j���nL �7Ŝ���޲�����.��S�z:�(�[���r:���B��{�?���'�ľ�Kձ�ó�|5b���@=jsve�~3.��V9k��(���ڪ�E��O����0D=�<�Ă=h��s���},@Vçٺ�]m`���ݩG�7]�������)
U�S �Iw�1��`]l��c    ^�-?ѲJ�U��>�FS�ը)���e�J꾉�i xr3�\������-��ΊT��'=-���i���ve�{ꔥRÈ����MW�_����$�g7�p�P��)ֽ����-*&RWMq�N�*J���W�ǏC\����!Hx���1����ٖ���=X��6r$�:/�~]n�+����-�׮S˼Cv=Y'R]+⢘������
�j�����۝�h�ެ�p:Xx�d��ķr��E��'��@���t���6��xB(B0��45l*0��%�j@��rQ��A�8/E�׋��i#�Gs�C{�Cp��cgR?b�ojD<x�����19�7]m�8,~ �>���֮aJpn�����j}>��v��X�İ���aE�s^���8��PsDxj4�G�,�����_��3�UNcl��F�'-�Uc�f�Zt�x�gSu�s�Pg-�ɣ��Ж�4J��\� \5 ���TP	��@��3������f��Zn��X?y�A��).�rϢ�P�ׇ]����$�l��9m���R�%Mh��W�z.��E[�m�fn�8|�ԕ���j��,�����Iv!{�['P���p �F*F(��� �J�j5�~�)�`>ZB?lo���}������s����oe�������Մ0�n���З-:�u��h0��i����[��gHG��w0ǧ��G�59�a�]�"����q�M�(�㡪l���if�\��u44f <'��w�3�l�_���`�M#>�{R�݋�N��l��7���HB�.���m2:X�����h�`t
 W��X0�6Ƙ���E��M7?�cRm+g�@��F�6�=�3���MS(�嬲�������q���l�I��``��Ԧl�a��c�Z~�R(���ǐ���)����%���P�L��!C�/�ź���Jz�`
��Ԑi�+�Hm ��4(�m���X�ߴ�y��Z��A[M��.��E�p��΂��8s`"�]�y"���9��n��HC8B�sx�k�d �!{Cʇ)��I/��[�D1��~���+S�>t`�t��^���쓺\�W;#�+�|T8�ٞ���N��w�t�2�r.���$g�T}v��q��f����-U��]��A@u�١Gݱ;m91�1�+����`��6�~��Y��g(���O�����ȗ�и�<�(��\�>�x��m��Ky�i�/Ί�P�0sh �m���,��&�7s�1����e`�X�^�-���[����&^��n`�7�T��|TO��)�"N�`��-�,�v��|>��5�!b��Vp�hJ!{Z�����Q6���l�	4��W����$���lr�4�$,�`G�qt����fm�CM�j1�Bnu�2y'������������\oylcB3��n쿝o.�g	������������Ƹ7���!�9e��3��d}�ɭ�8jyJD��&��<LW�t��6��/4@���yo���&s�⽰�KtEo�N���s�K/mO����������/E��b��օ 
���w���v�o���yyJ�1���;�
�^�Lx���Ƒp�\i{�)[�Tq��%_f�\*�P�?=
@^��Jd��B?��/7��;h���AU��!���� �|�%ά����
}�:���W%���QA��<�ʼ�弯�?����~�t��yR�no������i�4g��;)�bP�������o�ܕM1蔦 �1m��|��w��bu���h����!�*�A4�y�h��]�O��*���B����O����f�H�u����x�ה�\��`^L��m���Þy]ѻ_�>��;ċ�);d�F��.�!���Y/�"��L�Pא����=�魋/��~�6Yk��͚��U�_2�E�abk�{Wl/�1���۝U�G(�L�B���%�c�Oy���1^�����s��oO�.�[���8P6���zm� Ζ��,�0�agj����0צ�̮��2飝~}�Y�1NnN���:���X�ȯ.rhEdِ��E�\�>��s�����P����M;��@�c<'��/�R�M�oW���̛'�xs�jc��� �j-P:���2��@ʢ@ǈa�ib� �5��-���v^<�O}x�>���ۭ�|���L�����D�9�[M�^S��Kٸ^9��=;^��)�w�x+��j�2�6cn������Zi{L;G�1�ݍ��}�jO�]+�'�:��{��[�?��E,G����{�wb�ُ>|�ED0�MU�4R�y�)�)�����<I����1f���1���ژ#��r]���ٶo��/G�fr������ϴ�!1%���AX�����{t?�����SŸ+��3+�>����kd�*�A��jGLkS=~"��B�&c�?�ݏ���J6+�Y徒)��w�)0�/��Y��p�S�"��R&���2��� ��S�l���S��Ƅ��^qh��W+���<��!<+<o�����E��E�1�p�h/;,8�ѐ� g�ã*Fc�H>�)Ƴ8I��?�%����V�r%Ť5�)΅�V�)ΥMMD�o�cѠ�:,� �:��"U�!�e�^D.�Ϲ޲����W̄�m#�=���٤Nu�#^�8v\l�Y�I�1����7mR�V���iS�����_��Q�Cݞ���R=6�v��*S��]�5;�IaR�������#Q�<�H 3��`׈�\h@~#��a��#�=FH�,�6���r�C%�����q�$StK/����}P�ũi�ߊ��}�g,c��;����Rb9�Zk��6�u��-Ւ�\æm��ɽ�kVc.$E�i�� 6r"ȅ��u�weQ�0�+�!��NW�5���C��fEr{��=#��y����S�|wǬ���8L+����A`'�~�r��\���li]����6l��r�����To۽߂���H\'7��]�����p����7����D˦bSh������Mk��&�|��d���w�MrۀmhR��18���Ge_�}2�_N��g�}J�A�n��y������Tښ^�d�!ڨ���BX9������#�5�oᵉ�sC��W��_�t�>��Wf�gr�m������36��N��<,�F��c;�u�H�I@ �9�1R��.�ha�1���eT<ٳM�a>���0�B�_\%Ѻe~�c���a+��4�"���R�y�����" q��L듕�a�pn>��Àj��=��W!h�o�MOtr�$T(Ly�ytq�OHI����fV�#��5|���̮�T�6�e4�w���\���םg.�h��+?}%v�n�j�2Jp��B$C���|mD��Tj%���9��_�_G`WYt��x^R����s4j�!ivk-5��g���,T�k�u��</`(_��X(��8Zě����g4>�3�A��LQ�S���ٝ�]u�25�i�@�pr���^�|'k��|wK���&g�I�9y|�Ӳ�8͊�����ž4�T��Z�O؃%�2I��g����C��]ɲ�̚�}�3�Q!}S3TD��N����HqWE���?�ޮH2��[K,��뢋s�����<�x���\]HV/͜�������q��)�}�>9�7;��~O]7rV���C�JH讣^�(����]?K������Fil���'�}��� ��2(�+N��6I�"��+w���6Ǡg�_[q�GR�{�ͩ!/1�'f�0�[?�@?�@��ɏ(ݛ�S��&���R�C���2�8��Jv2D�;[�GNk����)�^�t��Z�`�?���`����&<��B��{� 1y:PSG�����;б����HVv$��r���mc^XL\`f,��g12`4����-�}���	����O�z������@g��$<��%��Uъ*�6I���IJcXZKh�`�E4� +l��M��n4gm����߱����7��<Z��^�k��CEƆ�J���#aBO�v�x�OFݭy�X��0����{��F�!�   /��#pF{��&.�88��ZۅJwr|+KE������yu@g�����A�d@�{Q�!�b��Ay��'���+A�z`����8\ZS蜘�%T��Θ�@�z)Ooѵ%��^	诂?�+r�/���9�P�[�q*WAġ�}y��� e|~TX�s24ڇ1L��Fo�c�4	/5D��˘&����@.����w87�F	��OlA%	R�� �.�h>F�	��{]N�����b3�Oe��r*���7���o4^Y|���.і�o43�l7F4����!�'G����q
]�����Vi�g�"�6�4M��Ýc������]ݽޡ8����n������o�s/�la
�@�����K���j@�h���!�&�~�1xa"�F��pخ@�L6�w ���L�����x�9��uS���� as�H�vg�Kk��AQ����wi��9�O��Y��;����O#����Q3u�i�ȏ���#X
{��+&o�[ϗ�n������m�"�,y
�iӼ�����T���
�r��*|��',s)����eX�7�Eai2^����G����s��^|� �� e��[�%���n�(�BM���5� �l�5���Gn�{�}�H4#6�z`��&����O/4����(�/@\hv��Q���~r��;��%M����H�8�z[C5Y�1�,߬�ke�s&@��B3��;��~wӁ�'G��br��/$?��t,���S�p`F`���Hr�[��C�q���]���������wu���2�p��&%�e~���Ն�4��1=�9��v��J���c*�ݲo��P���W�>C�]���']�X߿�΃��H?��
��J|����;�G}D�][<�R���jm9 �v_Ϙ��Z� �������hO7��X:5a页FLZ�7q�vr|qx�i�x�85ˏ7��K�)���/�
 ��:�?s0�~�]�RL���Rva?RG�{�)�$���M)U�Ü� RS�Z�8_tC���R�9u�G��,k����/pX�Y��㱣t��8�]���#����5�mP1^b"c@h������A>7,����$
��w(�{��G��������V�M��	պ]���E��E��z䏭/����d�?U!�ʆ��R^�����_��o<(��j�W(e�� ����(?Ģ�'��	/l��F��*tY>]x=��S��nXe�����B��R��I����\^��7��I���n9�|��6!�N#��Dڸ�O��V�����م��x�-㴊���M��Tt�ܰ��z;0fK@N�}ֿ6Z�V
���%�[��A*����?�
����2���ih�| ����`�*�)Vx���9�A��r'"a%�C4(��xv�Q�|�փM����'ě�����;s������"��PB#�?�C�G�y��Q���p�h�'��Y��5�P��H����,�^g�L��Aď�f�/_�&�أ{�bz"V�;!�� ??h)16zo��+*iХ�}���Z�o�B��9 FA}$��Gjݷ OV�q��H:��`$#��r_��WԺW�lE7|��i�,�Rt'H��v��f��$J.�8�[�mٖ�9s�$�]�T����L�޲B7;��`�a�g9���Ǝ�Q��A�H^�#j�]��_�ԇS�8��sv��Yǀ�*+�\��׹޿%=^������czY)���׍�eG��dߟ;����ugM!�"�xo�}���".|�m������Z��QEj+O�|o�X��H&�W�?ZI�(j����4�q�aS؜�.Fl��Kf��g;$���K���O�ȸ��T[��וD_�.ݩm����K��5l�4�ΐ��v�=֋��K� ���]
׀f���^�%��0M۝n�v��Y���E{yl�ܲ;��<��'�Eb,z��U*
(�.H�R�B��fe�o��l)��d���V^h+)ܑ��V܉�n�<m'ݭ(*���T��9��� ����
M�(,��KJ�� ���,�:�/�h�Wzþ��pv�79J!�N��Kø�R�;Q��/�y���zRB�8�,~�|��}R7GT@��-m��-Mh���f2� ���4G.�N�2�|�v��讽��0u���Z�'a����l����em�Z�gw� �+��%�.���,/�7Q�\��K�q=�:��x��n���m���ỷ�0b=�������jN��j,�}4⎀ܢ��%0Ô}q
�Hc�y��x����(o�C���E%;_ΊW��00���<.(gU�n�h�4#�w�m��9��cn]��g0��)m��+�S��c�_�A�vB-�DO6�颇'��V~�B;����Y��4E0E�E���~Y4�[xӻX��p�g"6���_|���kK\$7������:Y�J��mN[Ohuj�����p����H�<��������ܸ~��n/�O���	�v�f�F�N3�"A�=�;u׫���v~��z����y���%�S�����:�G�u}���ڨ�ZB;%{L���P�h�|���m-��{�-7������V-����P������^��;�LHD�H����m�^/YI)��Ց����%Ճ��Ab�v>���ap�Zv����b���;��򏖹��Q9���_����4fs���gvZ>��Ol�~Ч��xU��W�Fg4�I��Zo'7�ê?Jܖŗ��[�AS��t��}��Ipe�l�'�ݠ�p	�焔6����n[��^RdH]h}������hw4q㕀����-�j�3!�kRf'd@�ɫr����H�7�L��
�Q�U���۪]y�(�0F|�goY6f�!Z�M��{�z�
&-ڌ�]F1�ל$^�/���:�%���JQ�4�UU�{{�0C~
�`�_j����l�g;����T)�
��	6aה3c�|�
nΩ!D���QwO��q'	���� E�E�xo��Th�i���=b0��+�9�fp��)�m|��lAa	������E�tϜ���w��tɸ���`��E����n״��.�g$�o$T%�/z�'�6��AŪr��崹�D��^q({�7��-�4V2��"�OG��Qď�k	��ˀ���`l�fB�rc*#�j�?r��$�����p���6�x�<���Z\���>�2�;���}��,�,�☠ :1�i���M����n��S�zK6�q��{�N����7�'q+o���پ�ٻ�������W3�o��ӦiD�|�2a�R����O�q�.��x��_��3�I��@��C|8��s��n����	����Νuw��kc?���-{|��N��%7e�A��~�������3� ���eXf��uM�_�PI\M�l�:R��fEd�0Q9���]����\�����apT�Ǻ�C��o�~� ��eIA{	���|!z�����n<�ڡ+�!Z��ȟ�y�jg2����6��g�G�@��-�e7fke�0��_@K�����؀�e7��[�\���/Թ�yT*ډ��߻(C˒�FP�Ps���ܷ*��)�JP�
����&��K��rY���WI�Y��^�N-1��vJk	>������m%����&��Lm�Uٖ�S�x�&Λ��/GBlq��'��{��,�@�;����K���-Ɨ�$"�S�}�4X��}P���/0�l�)������['����1��67ݎP���ӎF;��v�j_o��hǉ���h�- ��B�?��0��8؇������׿��?���     