PGDMP                      |            nuraida    16.1    16.0 5    '           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            (           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            )           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            *           1262    24860    nuraida    DATABASE     ~   CREATE DATABASE nuraida WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Indonesia.1252';
    DROP DATABASE nuraida;
                postgres    false            �            1259    24861    answers    TABLE     �   CREATE TABLE public.answers (
    _id integer NOT NULL,
    exam_id integer NOT NULL,
    quiz_id integer NOT NULL,
    student_id integer NOT NULL,
    answer character varying(255),
    answer_essay text,
    answer_score numeric DEFAULT 0
);
    DROP TABLE public.answers;
       public         heap    postgres    false            �            1259    24867    answers__id_seq    SEQUENCE     �   CREATE SEQUENCE public.answers__id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.answers__id_seq;
       public          postgres    false    215            +           0    0    answers__id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.answers__id_seq OWNED BY public.answers._id;
          public          postgres    false    216            �            1259    24868    class    TABLE     ~   CREATE TABLE public.class (
    class_id integer NOT NULL,
    class character varying(255) NOT NULL,
    grade_id integer
);
    DROP TABLE public.class;
       public         heap    postgres    false            �            1259    24871    class_class_id_seq    SEQUENCE     �   CREATE SEQUENCE public.class_class_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.class_class_id_seq;
       public          postgres    false    217            ,           0    0    class_class_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.class_class_id_seq OWNED BY public.class.class_id;
          public          postgres    false    218            �            1259    24872    exams    TABLE     3  CREATE TABLE public.exams (
    _id integer NOT NULL,
    exam_name character varying(255) NOT NULL,
    subject_id integer NOT NULL,
    teacher_id integer NOT NULL,
    "time" numeric NOT NULL,
    pg numeric NOT NULL,
    essay numeric NOT NULL,
    status boolean DEFAULT false,
    grade_id integer
);
    DROP TABLE public.exams;
       public         heap    postgres    false            �            1259    24878    exams__id_seq    SEQUENCE     �   CREATE SEQUENCE public.exams__id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.exams__id_seq;
       public          postgres    false    219            -           0    0    exams__id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.exams__id_seq OWNED BY public.exams._id;
          public          postgres    false    220            �            1259    24879    grades    TABLE     i   CREATE TABLE public.grades (
    grade_id integer NOT NULL,
    grade character varying(255) NOT NULL
);
    DROP TABLE public.grades;
       public         heap    postgres    false            �            1259    24882    grades_grade_id_seq    SEQUENCE     �   CREATE SEQUENCE public.grades_grade_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.grades_grade_id_seq;
       public          postgres    false    221            .           0    0    grades_grade_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.grades_grade_id_seq OWNED BY public.grades.grade_id;
          public          postgres    false    222            �            1259    24883 	   questions    TABLE     .  CREATE TABLE public.questions (
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
       public         heap    postgres    false            �            1259    24889    questions__id_seq    SEQUENCE     �   CREATE SEQUENCE public.questions__id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.questions__id_seq;
       public          postgres    false    223            /           0    0    questions__id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.questions__id_seq OWNED BY public.questions._id;
          public          postgres    false    224            �            1259    24890    subject    TABLE     n   CREATE TABLE public.subject (
    subject_id integer NOT NULL,
    subject character varying(255) NOT NULL
);
    DROP TABLE public.subject;
       public         heap    postgres    false            �            1259    24893    subject_subject_id_seq    SEQUENCE     �   CREATE SEQUENCE public.subject_subject_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.subject_subject_id_seq;
       public          postgres    false    225            0           0    0    subject_subject_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.subject_subject_id_seq OWNED BY public.subject.subject_id;
          public          postgres    false    226            �            1259    24894    users    TABLE     �  CREATE TABLE public.users (
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
       public         heap    postgres    false            �            1259    24901    users__id_seq    SEQUENCE     �   CREATE SEQUENCE public.users__id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.users__id_seq;
       public          postgres    false    227            1           0    0    users__id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.users__id_seq OWNED BY public.users._id;
          public          postgres    false    228            n           2604    24902    answers _id    DEFAULT     j   ALTER TABLE ONLY public.answers ALTER COLUMN _id SET DEFAULT nextval('public.answers__id_seq'::regclass);
 :   ALTER TABLE public.answers ALTER COLUMN _id DROP DEFAULT;
       public          postgres    false    216    215            p           2604    24903    class class_id    DEFAULT     p   ALTER TABLE ONLY public.class ALTER COLUMN class_id SET DEFAULT nextval('public.class_class_id_seq'::regclass);
 =   ALTER TABLE public.class ALTER COLUMN class_id DROP DEFAULT;
       public          postgres    false    218    217            q           2604    24904 	   exams _id    DEFAULT     f   ALTER TABLE ONLY public.exams ALTER COLUMN _id SET DEFAULT nextval('public.exams__id_seq'::regclass);
 8   ALTER TABLE public.exams ALTER COLUMN _id DROP DEFAULT;
       public          postgres    false    220    219            s           2604    24905    grades grade_id    DEFAULT     r   ALTER TABLE ONLY public.grades ALTER COLUMN grade_id SET DEFAULT nextval('public.grades_grade_id_seq'::regclass);
 >   ALTER TABLE public.grades ALTER COLUMN grade_id DROP DEFAULT;
       public          postgres    false    222    221            t           2604    24906    questions _id    DEFAULT     n   ALTER TABLE ONLY public.questions ALTER COLUMN _id SET DEFAULT nextval('public.questions__id_seq'::regclass);
 <   ALTER TABLE public.questions ALTER COLUMN _id DROP DEFAULT;
       public          postgres    false    224    223            v           2604    24907    subject subject_id    DEFAULT     x   ALTER TABLE ONLY public.subject ALTER COLUMN subject_id SET DEFAULT nextval('public.subject_subject_id_seq'::regclass);
 A   ALTER TABLE public.subject ALTER COLUMN subject_id DROP DEFAULT;
       public          postgres    false    226    225            w           2604    24908 	   users _id    DEFAULT     f   ALTER TABLE ONLY public.users ALTER COLUMN _id SET DEFAULT nextval('public.users__id_seq'::regclass);
 8   ALTER TABLE public.users ALTER COLUMN _id DROP DEFAULT;
       public          postgres    false    228    227                      0    24861    answers 
   TABLE DATA           h   COPY public.answers (_id, exam_id, quiz_id, student_id, answer, answer_essay, answer_score) FROM stdin;
    public          postgres    false    215   �9                 0    24868    class 
   TABLE DATA           :   COPY public.class (class_id, class, grade_id) FROM stdin;
    public          postgres    false    217   �:                 0    24872    exams 
   TABLE DATA           l   COPY public.exams (_id, exam_name, subject_id, teacher_id, "time", pg, essay, status, grade_id) FROM stdin;
    public          postgres    false    219   �:                 0    24879    grades 
   TABLE DATA           1   COPY public.grades (grade_id, grade) FROM stdin;
    public          postgres    false    221   |;                 0    24883 	   questions 
   TABLE DATA           �   COPY public.questions (_id, exam_id, quiz_type, quiz, img, audio, answer_1, answer_2, answer_3, answer_4, answer_5, key) FROM stdin;
    public          postgres    false    223   �;       !          0    24890    subject 
   TABLE DATA           6   COPY public.subject (subject_id, subject) FROM stdin;
    public          postgres    false    225   �E       #          0    24894    users 
   TABLE DATA           �   COPY public.users (_id, nis, nip, name, grade_id, class_id, subject_id, phone_number, email, password, role, created_at) FROM stdin;
    public          postgres    false    227   �E       2           0    0    answers__id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.answers__id_seq', 16, true);
          public          postgres    false    216            3           0    0    class_class_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.class_class_id_seq', 21, true);
          public          postgres    false    218            4           0    0    exams__id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.exams__id_seq', 5, true);
          public          postgres    false    220            5           0    0    grades_grade_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.grades_grade_id_seq', 10, true);
          public          postgres    false    222            6           0    0    questions__id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.questions__id_seq', 69, true);
          public          postgres    false    224            7           0    0    subject_subject_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.subject_subject_id_seq', 5, true);
          public          postgres    false    226            8           0    0    users__id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.users__id_seq', 583, true);
          public          postgres    false    228            {           2606    24910    answers answers_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (_id);
 >   ALTER TABLE ONLY public.answers DROP CONSTRAINT answers_pkey;
       public            postgres    false    215            }           2606    24912    class class_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.class
    ADD CONSTRAINT class_pkey PRIMARY KEY (class_id);
 :   ALTER TABLE ONLY public.class DROP CONSTRAINT class_pkey;
       public            postgres    false    217                       2606    24914    exams exams_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.exams
    ADD CONSTRAINT exams_pkey PRIMARY KEY (_id);
 :   ALTER TABLE ONLY public.exams DROP CONSTRAINT exams_pkey;
       public            postgres    false    219            �           2606    24916    grades grades_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.grades
    ADD CONSTRAINT grades_pkey PRIMARY KEY (grade_id);
 <   ALTER TABLE ONLY public.grades DROP CONSTRAINT grades_pkey;
       public            postgres    false    221            �           2606    24918    questions questions_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (_id);
 B   ALTER TABLE ONLY public.questions DROP CONSTRAINT questions_pkey;
       public            postgres    false    223            �           2606    24920    subject subject_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.subject
    ADD CONSTRAINT subject_pkey PRIMARY KEY (subject_id);
 >   ALTER TABLE ONLY public.subject DROP CONSTRAINT subject_pkey;
       public            postgres    false    225            �           2606    24922    users users_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    227               �   x�M�1
�0Eg�=A�d;IǺ�d�
!��޿�a/�Y�I(���h�qY�8Q�	�ʁ��C�<��Jwb��B-��p����t�-���*���v��&`=��M=O���kk���K�n탷�c�J1�         Z   x�ƹ�@�X��h���a��Ak�!:v���h6qB,��������)���c�D�)Y� �8��L%+l�e�JT������N�         t   x�U��
�@��٧�	dw��icD�L��1"�Pߟp�9�o>fơ����kx� g�e�!�WV��K��yޗ�2��$��p�7e��B|�������6;�u��"��WJD?��"�         '   x��I   İw+�a��$a�8v��T'��4_Q?Dk         �	  x��X�n7}��
n^� ��s��d��|���KaN7���nrB�=������~X�dO�=-Y���}� ��M���*�4Φ�8���X�Mfo_���l�-��ф�L0g�9�F�~��pNF�~��#s��<g�;s��<�tي�6Hqj
k��r0�L��2;��hM��l�4A:�����miL{p�Ln�8�������k���Z��4Bn�С�U*ׁ}�;:b��|�i�kS
efm�7�n���l����<��d2�<k}Ѻ��B��+��~���-�l�Ҕ�maw�C:��'�.++d#N�W��%����$=�#=�Nx�k*��ڋe�n�oT�lk��B����Qhq)��J4�WŦ��<<9IROȢ�Txd�2���h<���F�\o�5��B�"-�g��uU��<^Vi��h<M��n�R�B;mvR�|��������~��������t0g>I�1��z�6�_���7,��ނ2m��WJ�������:]HD.��S+�x$k���h���G�^�����9~�t�H|����ɷ	ֈ�2O�9�F�WN��]B>v
�٥2!+��!��V�u�*[Y*�
��ھW�4@a��%�ɺN��^g�%���3L\w2�#�qQ�2��­���ĭ��@�J�B�Rj�p�v ����A�R�-��˘܏~Q�`�x��JH�6�E��S��X9�$���n��6kDa��5�{7M��b'J����{\�v��RX é{^HQY��}�E��$��iC����Y���&��\�j�����6���
"<�<���.���8ǲ�Bյ�r��j�5�r�1��,J��-�����w�/mR�X�����krWz)������Y}(,�z`H�\�������In��V�m�y�� Ȳn,(C��A�%��P)(��� ]��p��>�1qϬ ������.�R�/���\��wG�M�^K��Y�t���$J5�(3P��&��tȨ��-k�V�E<u�SG�+����E���� 7���*ջ��i��o��W��>�|T�=�T���;x_5b.J*��^]r�7G��[q+]EN����A�:|�4�(?�w�c��;���$F�U]����&���k��T?u���*�>�!���-]�W<��?�\��PV2�{�P'�mq!;�g�rs������]���+�3��"�AI���u�����w��Z�y��=(��
_�=����;h#p���a�[Z[t��	�De�����Tzc	�ƜK�vT6�j��
4 0
�Rؕ���`?# \7�Ŕ��nE�������h��p�tC�KE��@-��ǣiL��+l�,�ؗ��)<ةL 5QfA�MVk*�`ߺ�qZt*Dt�&�~E�ѥQR�5B��0�Ҫ����"$ƆH����3v��-���Del�U�����QMPD�K�AP'�F6�{�,A�d��s��6LXl+�&�eiQ�6�<�=�p@<e�����1��P\О��%#��NP��(���kb��g�.*{�Iy��a���u�uq���ŗ��.��e�E���u�:@�
��i�u�_B,f�����|+�S�7*Gi�
�8�[t/ n���W��.�5MH찰�HtZ�k_�J7p���z�)��~ժ��k�k�����k8���^�鮑k%�͍�aa�Q39sD��	N�����J�%�����
-���a�q����[��D�@	\e�]d �i��k�l�DhI�+"����(B:lU��C�(�
�������C�;!�Lr��M48` �1�� a��(G���D���
���(r~7k�-��ʰ�/`'̮������AGG�x{Y��%ή���cXvL$��a2r��,Rm��c:��9*:D��{�����i_�ѩ�<3,�"�,<^�Pf��@�!-Zd/��Oh>�A�r���´�;B����X�<�dϕvt 2���
pQ��C�S9�Ի�xR>U�g(�!��� (�(�����y9R��+}<
X�	7��r��&�4�ϖb��8�
GN`�E:2vgf��S�"Y���#����_�����&\�_W;�=�J������%�D��h����R�����ȟ1�Kp�UDl�K��]�HC��yem��˙��)(��a(�	`(��MT]��֐l��Sw�}@�ӎ��l\�*%\��S?��@G>�!�m"q]�8-�2p0��Eް_�q��I{����i�}����<�?6��}������Yw?�1��u��9��iw?[��;��g�_�=d�O��ώX�]w���2��������mu��I��mw�󘸟�����n�����-w��E�O��������t��>�ﺻ�]����_ܐ���_�̻��~�6��E̹��Ov���R���/b�ew�XD�]w�x�{��u�ʡ������sw�������߻�������'����F���      !   E   x�3�tJ�H,NT��KO/�,�2B���g&rÄ���L8}KRsK2��L9�233�b���� ���      #      x���I��X�5���Ϣ�z�VB󐫖�&4"	طф$4�	į�+DDTU<�af�囖p�^�����;�?���G�a�ih�/d�G���������ţA�.';�H\˃�	}�̠"�[Ha��J:Z�[u(��c?L��F�����D�/��%��h'hE�����tA���������xڌ]T�Q(E����'�2c�2����E{�e(=�Y��@8BQ=#@�l������J%xlZ:�k�$�IF�z$/�SqSс�s��h�1qC%������!�dP|��� ������pٺ�;�9�ɮ�������%v�ȫ~6Z�� ��檍S�>�?A`�Ep�&�D��b�@���J�:���,�i�J���#�>Vn4jbԆ;�/��gҁd������L �g�2���o��n_���ǟ���[��E>ԅ)�E?�]jw�F�xm	~}��6ZM�->6V�UB64�w<q�����ѫ�~s]>�0�A�Ef#�`��	���S��f�	����@rP{s�/���T���w��a#O�~�\FإK_�7G�����3�ȿ8
� �DE�PQ/H��+铿AoA�VMv:���=�"ylI�F�N�-T�!#GbhF��'�d�iz/B�_d�Sa�,������W�Ib�Ga:H�սE��'�>�M���ۣ}Pv'G�(~ ����qB���' j�����-����u��ʑ��;hHr�Tǀ��Õ�>��u$���)g4��a#�m�7޻`@��P���-�K�_��C��'�����Wܭ�]/�5�Nh�^���q� �]U2�T:���
.�����Q�PO�E�����.��oL��N�����_������"�D~��$���b�4��_��d|������'�4��D�����O������D_����������H���8Q�����O$��^
[0��O�~~"�wnf������O���bH].�~}"�����
e��5�|"��?�����^䉽\�/.�>C#��/�A~9�^C�l{y��k��t���{���m����|Z���� �8�����/�A~9�w��������� �:��/�r�� �;�-B{���w��s
Ć�#_΃�r�B��#�󠿜�;�P{^�r��D��s
���ȗ󠿜�;�0l!"��<�/�A��y(������{�_ރ�����"�������K���E��/�Ay��ރ3���������K�!^f�r����<�<#8�r��`�<?���Nu�\����K����z�_"?������͸g����ta��Xb��A��"�i��[�ԋ��Vw}�3�e:�O�Q\�/,���@��Q�+R�?8J?��M����ˎ����Cqs�4�C�?d2�ǹ"ݭ�������=w�����t9����P�9�{b!��A*:�:����l��-
�H�F(�%&�����&�:F��u��"	�0m�>8Os���;�t��Qh�6�y _l���_vo�$���;5��1�[�L�Xs�<lܵ�%�����R���>ܸ5�(@�=���������r������@ũ��aC��:�uu��|x����w�h�]��-�Z�F����on�F���0��@��ߦOm�~�Ooa�5I�fO�k��Q�zpub:7�!3h{����qx�i���L{��?����߼�e|�I�Er\՚U�*5m�v�T�����Mq�S,������E5��K�}����')�0��6|�Wa��4Y2����v�ɩ�oM:�1�?(D��TV�,<+;"8��$�uͬPt����Ӄ�� �yB���jd�c����NfS�sݻ$b:T9ډk+&�0ҕ���*�C"YAPy�~BF-@�p~�\�~��_VQ���tZ�e�[p���#"�F��I��KY9ƍF�bb[��M���;$��8����� �����>����"�6DV��:�<�$�o��t�J?e�gy���(��xrĆo���b(���9lۧC���-i�񽥨��֫,jNE��@�d��!U��f��>���c��{����� z����mL����ӷ@B�|�6/�wX5����(��۝�6��6��6=��:�~7��τA	�^�P,��]w�_U����\���K|Ua�e�#�Cv�~Xچ�'�k˼/��!�sw1z�I��߁!� Yl�[�������o���z�<l��V M(�ž͠�A �a_��P��u�U�ך����BnO�}~��8�����"�����ܴ;ZJ�F=�U�]z2�ڱH��uy��[A��w/T���9
2�c�B,�4�Ϻx�<Wq�>
N�jz9F8���*����y�����1si��]eR<��[��� }�/yǗ�Ȯo_vEY=$���|�x�L��d��gx�y9�!��ē�n��YWm��kM�.�Ϥ�0�<�%��X�	[�ۉ�P��Tn�9����Jƞ�.�*3O�J���B�zx���)���ݏt�lFӸ~ �@0��XH�E�z�^Gq7���/��|A[��:�	�y�g�:��py���b�(lk��������!�xe�4�S�R��!��V�8��ϱ�������j�(8�
�c����n/�%��#"S�����"�\]!�3����������-�՗�N@��o���m��w��9L�Y���-�ʙ6����9F���҃+��3���>�0���-�<E>_����χ���[$�!�ux���W�D^Ő;Mdc�G�|��7�
�%���F�K�I��[�!]}���e�ދ�v�7�Xmj�\b�o�C��5d�(������4�ۻfe�7�D�R֠f-K<'��KDk�A��[,k�*xx�Qn�<�Z�[$����W;h�A�;���x7��.uo))?bApyaT��/ߩ�����2n�@�!�?�mN8�z��#��ǽ�]n�x�.'I4B���}P���
���P��"/Fi�a>rD�{i���2Λ"��`d���Qg._�}�+F	�׵A\����nb�'�����) ��0�CPk?l���:;���HTY�kup�S$���Sh�:���⬐Ͱ⢔�Ds�BQ�3��3�2����@p*4nE|�T��9y�����h��?�S!��P��$$U�E�;�ا��P��+�*M�Ԫ[����M�,�"5#�,Q�� ik�I��	�V�nu�b�0�][�e�ˣ`����3�.�zVJE,D�B��B��(+�ya۩�����ÃKdB��~��Z��ne�gy�EVz�;
^�F�Y��O@�Q=%�ڽ�rT��Ӧ�,������@�����t��nN!�Ik3�Ηln��瀃"�(Y�Y(@~H�~��pDw���d��[G�������?��zU�׭���IxD���*��)Ϙ�>1�\�+A?�D��x>��-��Z'J����-re7���r8*��|�sqI��X�wv�Ϟ����{ĊSOyt�Aԍf;�7���ʤ<���O�ܷ!la��dZ�85��ݙ�9
<��,�"���v�ͽ��/N�� ��b�F@t���\NǓ��������NgLj_m������[�ѮN{���{M����ab)%� ag���>P���\��[���ܦ�O�G7��bO��l
r��iɝ|ks�rƸ�9U��w�F<������2h�!/������Rg<���f֡��APh�T�}�D���z�FP�zu+��'�,UkffU�y f���bV��{ 2Y6�K!��մ�9_Ȣ�#s:oפ2����z���Z�S;���g��H�YJI6�觍��\_ї����,��⩬.�<�R�����`j$
Z�wV�*Dg��'��8���)��`�R e ÒK�W���K�,�:�w(�R�X��4�藍��5J�h{�̾_��k.,��K�#�����T�E ��j8Ph8�<j��    ���:낶�����X��Y�n�	��X��Zۼ��,���{���AI����  �d.�?+JU?Kz������hE�}l���bv���'�w0�����U�-*�Z���	�R}g�R�K��~��?�2d�v�����v�W�5���4��G�����t��&�غ̮ǜ��YD��.���L�K��͚ԯ�/��*~����8��pS9���>��ɐ�Ƹ^��u�V���ZB�-��%�1!P�z�Wf.�K1�������3ו��$�b�;��4�ẽ��5ڧ۶N��S��cOkGކ)�Z1c`^I9ó� K�+�����{ژ�o�U��[$J11<8�]i"�ِ1��Q���$�ެbV���	��p,��%�q�%�qR� 9��b�&����pE��m�8��2��;�a�8�4x;ve��B���a�_�o��)��%��Xzy�ɪ*�A��)`��֦Ә��\�8��Y��c��h2;d��/���W���1�Mm��U���XLP�����痊�P�@E�G�o���=�S��d��h�I�#�cx�#�g)9p�M!�6'#�A��n2CA �/Pf�������������V��t���M���E��ȍuܔθ��B�Q�0�����V��q\�̰E�K����]Oc��������$BH�Vf��A��n��X|�<o,��U�k���}5�{�������8#�i�e)sy ^��o�/.{�(ޠ8�sK�)sLI呍�Iڟ�?�劼��pi]k/�\ubet�̮$�"��n	 ���4P���� 8�Lv�\ �z�X)�/m~bc��7�|܅�]�μ��4^��>����l���Ԃ�����L��o��O���]G�/�����o��w{cگ������t1k��>����9%A
���0,E=O��Z  ��,���	�y��[u�����m,�N�/(��c����p.LiEo큿|.U�L.�� G���	���z �y/O"X�Z�?��I7�྾h�����N�������j�p'���gU@!��h� Ȝ >oǉ�`������x5�� brΗ�A[)z�Τd�͛�]a��܏
��A9�z����D�	��H �"��^���[?{��_�6h�@�pI�����*����_ye�_c�.3�@[N��?�@
a�-ۀb��Ge���}ٱ�3�7([���1p�զf����+����ȪZ	+�mn!aQ&��fz���j�����҄� �ŗp̖A�q�~Y>/�w0�˺,��ڳ�
�d\�b�NY���wD?�g�K�ol��	�~��\*X�ZZ6���,��#��DP<|B��X�5����	b�#ѵ][	��X5��.��h
&~Cf)�j΍�v���a>��H0��ar��{��	ɞ\6*��:��ݯ\����߭��^k�͙��~y5����ui����{�ut�n,��)�xVmL���H�pA��r�k9l)5a>S���Y�.Ui�/�X��9"�7�:�N�qMv��a��W�M͙��\���ǣck$�6Z�ٷ�wv�4A����g� ~�	(�������2�j�D¾m����~�t(�3�%σa�WﶊW�g}��Y���Zѹ�4��fs��eU��J�>���Ф�2�|T�
�h��3��h�(��|����`|V4�!K2����2�zv�����(�;�[('�b��|�'ځ�c,6熩B],;��ei"�C�̥�{X�ȶ�>�,MR�K�^	�3��u����wq1�� ;>tn|nMݖ�����A�ɩ���=���e4�^R��+��m�AY��~Vɝ��"��}	���qSi��7�MGa�,��VP��
H�f�Tر��
u�ƺ�c2��SC0faY�M��=���'�Q��[����=~El)p�s�#��+��D�*�2�'55d��L�~��S/�nX��P�Ώ@��<���ߑ\��-q!|\��3ZR�k��5���][6}�"�H�J\������	��Dй�8��c�u�g��q�s^���&��Ԕ������Gu���ȝ��Z��d�[�����ï�x�+0�'��q緳,H�j����2�m2{׸�["�Y�G��q;m󀱻���"�����׮����g,B���,�
�XR�-��ؼ���x��{��7�+�ǡS��#�3��T,nC 7Dh�T.Ni������8H{,3��<����ԯ�Dዡy��Gr�=�bsV6��8@�p 	���A�o��f�ʻ}��D�?�	�N�U0� �RK��>P�<�F��I����Z#���{�-��B3�F*'>�è���<b�:Lj��|���O|�P(�L; �X�ջUm_�ӗ>?��wbiGfwN�$�:LLl�;�1��F�btN3hg�W��Xn#4S���c-t��d1p,��Z����٪0����dt��+}�W�T؞jC��������j��Xlqm���2]�W^�$Pf,4/n�Ǘ�� �)��M��e�zk�vv}�GB�u`���d�&;�ڎm|5ꌵ9�����8����s�g����9���!��Ty�"�a�Qz�چ�*w���)��asf-m��G��#>v����+ ase�z=}�>����k�f�h��1$�����w�7�ڵ6}��(l҅�R�A��a���φ��MA/s�`Q����x>�����i�k��F�QM s��2�v΄�=�o%F�Dr�8�%�5e{� 
����%��I��s� ���b�v/��3'i@7��C뎄���߬�ɤY�=����<!��G��l%sY	}�2=w6<�1�ƀ���Ϣ��C�A�'���R3�}��;�<r�\7R�������Sbe��/�۟�,
���~%�د�w���Vwq��gZ^�魍�,j����Mbv�&�Wi��9������}$d��?Pk*��Hhby�)8�����<��Av
�����;����������$���-��+� �.��X���i	��?�7�EɥO	����n]���ʒ��� ��*���� �.ޟXSF��p�)v5Hm��&�E��	�l����3�\�u��
��-�;������\���ap/J��M���Xس�x��rh��-�B�ݰ���j� MZP�D��O�l( ���
?
|����9�������]&���f��^PM_�� ,c�ו���;GX�D��&����w�Yv������<n��7H"w7x�ī���Og&\9�@������eh�c�
�B��g��XAÖ�N�%QzQ�������3�ǒn�:���T�2R��T�sl{������Fg����;��d?�?�I��e�`!�����ۏ�8K�_&�P?�ʵ�*��~z�B�%�TW�5j���8���,�|�����~͞Ϗ`����:!@���{i�tqŶ�HC���!���fy�N?�f'��z��'�ΜW���� !�y��,k��ҍ�_�����=�0D��&a��7WhP=��ӽ��4�K��En�[�W�Æ�on�'򺝹@�H}@�~UI�ܞ���VB�8��IA=c	�B6az;̏C$X*�!2�����q����Ү�C�T�T ��d����R��L|��ˈS(!��:�R���Fm�Cg"Ld;(��enp���`1b.оz��	��%ɜ��CR�DQ���c����V�c�j.��Ў����jp{/N[vd��9.?&�>��u-�2�6�,��R�if��My�}b�l�E�����@}�{A+���ҵ9+�b��u��X���3�$k!斃e`QϞ�N�f%���-�w��# "M���Z��p��-�Li��W�}�\0��!��!��|�K��kc�[fi,��$���P�ｹu�q�_{��/���t79��<�}��;����8i��Y���	U|V,��F��y��\��m̾$��Q�w��r0Ċ�'�M�Mz��`zE��@CϹ�)�QU�u���[A�Lp�uC������K����� 6W��⭔����S�k    :��-lv&;���j:2g��KGw9��-�,��>2�~�`���U�~�%�S�cy����z}��23��Io\��
�ܘ5K��1�j��e����>�� �[�<����z�x.f�5'ϟ��=�����~j�y�Q�]-�D@G�K�C�o�����ȩ�z�ϜKP�t_����)ˤ`��ӗS?�����T�������Z�IĮt�!�}uR/��q&p�Vľ1 ���d��~�.T��Kl�y�������4^]5u_f�t����N�8Y�cw�;u�+��m$HY��'�E��9A��;d�#���d+�Ⱥ9���7Һm�±w��H��5U>ja������u������E Hb\�G3O�~W��7���Km��`���&�;�"
�m��9(�D�n���}��$h:ޱK�d;^�t�h��jD��JQ�?�z�%��O�+������s�g�d.��TT�mω��	���㜠)C��2O�^@�N>���İ���lm�ѧ���A^e�y(�Xf���$f�$�i�ed�_!V�+���Ğ%��Ͼ��� �Iu�dz�b>�I�����3a�2вd��?��&V�D�y���ɥ�S5�M���Q�h�i��9���|;��n�9NE"�K"癣'�쳰�ۯS�B��M����1�R��4U���U��tN�}�8�����k���Y"�P4�B2O�.�*N}~�������I{c�<�.]���]o�7�G��%���f��-�:�-�CR�M�Baz��KȀu���d���/Xnܾg;AKU���9~��X�/&͞]���Qky���#��^n��E��e9
��W��<���h(�Y���P��{�.Ϭ��ɂZ9�p^��ɤ��z���!��h���9���t�Լ�g	��s\�� 9n��:�C��H��5�T�c��Se^W������8*�"$=nTB������ 4C�^��#a�/{��vX���v=��y'w�1��U��V�ֿ]b�m�4�v�+ѽHbt��Yj��8��g� l�Um����e�����:��\�9:Ǫ��H��S%�8%M�W��MD���ޣwe��o|��_�3������\�2|�E�oPڮF[�t0oH�Tz�ή&�������5�b0��f�|� ƈ�k�<F-=�J�k���t�[$d��;�&.�i�­6^͂��c̐{=�j��{&@���ڵ��\m�I{=c�#a���oAz�gat�;0\ 
E/rc.�jtC�6��e��K�;`D��z'��]#bĜ?SM⯗�y$�����?���*̋g��w$n��H����m��7!j, ����q{T�|��Q��d���h�F�0���my�����bR�~�̆�:Lr�u��O#��q�^kő�����5'�r�؇�OO� E�tq�C���z~,��/���6�߂�t��~�6�-H���dNnd�l˷u��e$&O�:�8̈B���\f�e69��x~���4/�x��@�!ߗ�p�;��7�����F,b�T�<Z��5�prWp�~N���_B�~�.%�z��������9@5oY����ݎ?�}S�y��z��p22�&��n��崙�����0��ϭV8�<��$!B���q��i$8�����V��h����F�^�����jn��Z"d`���L-Na����p��Ů�O%��g��;� !�
�wBH�#����H��%�%]:��&V�U0�P庂�XQ� ����;������'	�P�������ԅ��m%X��7�֒|N�A����K��a�5n<��x���~���P�����4��q8���0�����p��Vmϕk٩,��yw��Ce���]2bҚs�$[�pccfz�T� h��%ͥ��r���7+����_Q���le v�$!�#�H�9����W}f��Bi"O`��j�(9b�	��D�<,F-��Nm=�Y��0�[��z��F˜\i����I���=^A:i�Sj3���v�?94�B�,d�]�I��R�����-�=���6�ʪ�����[��⛨�|v'	v��>�ZQW��U��DC|
3ur�#c貵J2˄0��6�߇D�F8��a�� �_��r�P����Mw�&Ц��I/�����,�q��zh�|e�����[nxV�Ab���·hnH*�!�T��E=`q���$Zz��l����m��XvG�=�'rh}�̓c�[a|��
�{�b�Q,�I�Ôku�
��UXu�lwP��N��֔����j�¥O���F^���cK>d�U5_Κ&����JŨkN��C��
꤄�`w���U1"]��C"U�D����o�H~x�yt���Y����H�[pM��i�]�j(��JqT��o!S��25�dE�j�Iצ�!xar�w���l� �������LH�@��%�����@
�?l�T����r>��p�Ȁ����vBy�8ٱ��ɨ��7@ȹ�� ���;�<z�3����L�q�E���d��4��ԏ�x�F+�9D�K�?B���7۾߬��p_ݽO6�����6�[Զ�Wݶy�^�;�Ӕ5�J��B��c2O��98[�}�c��WW+�8��g�GQ�~��yt]� �i��آ����2-qG�]QȐ.����\%�S�$�~�Q�א�守� T4���*(
�日�ݶˣ3�;g�+�8���ⶾA�c�0�$<0u�H�F�-�@�rQXM{�"|kc8<�*��+�#����3����t��YP�7����\�D�y�%.-�GJu�b��7��P�@�&!{������l�q�I�bϩ�e�o�F�#�D���y�%��`&�y����O��fR��Y�;L+kX��c\UC���Kq��*���6���,C ������58i܂��������!�~��(ƋL�\Ƙ�@�w)<�QIT�ےH�(Ǧ����aZpY�;ϏQ���;�@����D5�<�^O�ㅵ"�qp�sLK��zw�n��v�A=�������cW�g�oK��Σc�d|����n�P�����`R��谆�K�f���!������]fo���0��ߤ�}"r��#���y� N.M\d_�$��%��Ȋx0�����z��M"����=����<Zg�jb�ɘ@*��J독�E!/ ��H9�m՗<�L,��;y�2ί�!c��N�p��t�ݣ{Q(C�e}��wr�h�M��?U 
A�����e�W������2J-ǳX��Nj?�����r����<�x"���X�q�d�"��T?��0�2��W��.K����߱�%Ƶ�8
]�U"v�,�)����1�д��H��4��].W�Oe~I)�P

���ۺ�3�y�� iH���A6��]k�h��H��)��4d%����5�ګ���C�;8��_�-g��J��z��6��[���h~�'�{���u��Apm�.!UdZ��d�|����ǚ>s->��3�Y�.�U�k���(��H�}��L��	&��=�\*$&ї��KilB6�	��<�ĩB���3!
yJIt� ��GM{�����m��[��E��y���>�'�?B��p{
grך�x[�E�̸2���k|38,�I���dʧY��_�\$,�SL&MIu���F�P�K	"&=ʷղO�p��,��Gvڦܸ�s6D �K+��q�E+�Q�dן��xo4;bĭS�f&uJ�x"w*H��T$>0^�e��E��`�8���Y+@l���ofˌ���ٗ��]>t����ylm�N:�{�I�zǳ����GR؍����<~��@�������e�WĖ i���q�����i��u?�}�\�������K���ȷ���1���Hj�����yJ[���$�4���>`� ������� 
COT���&KP}	sc��V�I�H��YS��ʏ����	��ţ�Y2zٽ.eQ�w�x���#�C��7ڤ�Cr�6нh� #��?�h#�)�`w�������I��s�iwY���]�����=��q�_�A�8�e�    �v��Ր��;7m��n[C�%�?�
�u��PD0�k/,:���ԫ�ĢlY�U���o�8�C��˾t.�A�T��Ƚ(L�(��4�..M�;�n�P_��yX%_����c��qN��ϙ�Q��ҏ{Ô�JE�c�
���Ĳ���1&n"�k�=	wg%}��N-��<SF,K�7u��g�[6/\y����S]��� '�O+�p��M{�Mn5����E�.͊��RI���V�2f��"�A@q�˛Û�x��N�o��;�v,�ee/b�����M�n��G"m��3��$��~�d�(Ö2��>�[	S ]�b�d�(�&���PJT%,1�{�8���09���{��Z��'�)e�����~a�~�;�@"������p,��!���r�n�	���Ƽn,�x�!>%�Us"�b�j�v����3�P���s!�_>4U}
|H������fV����Pg��.l�� �Ȟ����euQv�j����-�ן��`��g�t^_1�N���͚�d��;�a�	��#-��χUf林�n=l���.�=����Fa���<R�coR� 	�~��y&w�a*���H���תo����!�r%'�ޅ6�ǲn;F����h��-��6���u<��u�*V{����u
gP�Os-�IU�Ǖ�X���0ETz��0h�%��2@tO����_��r�(���7��B�|�3Gj8f��+<�-��Y��2�8
焮��R����U�A����g�Z��͖����C��ނr����DF�RT�]8\���24�+��|�o���{O�>{2��E�'�e��i�bݶq����DvHt?��C��]L}�ę�T�N�Z�vM��S��Y�\M~V�4I�/�?ϕ��k��v����}+����#n�܊he��tD7�� �I-�ҙ3���MsB�uSޟ��S��B!�f=t,{Uz,?�R���?��pj�2���p��g��]$Yۚv�{>v,Mh
�������7��k��R6yN������?�oP�țl�Y5*r2��phK�f�[�U��En�c0���e���|C�4����{���p��
��0d��!��X�)r};z7+ꆍj��u�]<L�jʟ\���X1����08L�/����,}��#�������	uD�`h�`��wR"V�4��BqE��6�z̦98�գ��
�|����"�y2t�y�5�Ğ�ϳ��CR�j�'��� ɵJ��>�����T����B��x9�5]����	�����9Hѿ�2�1�w��r&}ƾ����Qg2u��Y'���~<��W�Oʬ٧N����|&{	�:�y��Wَ��k����� Z�c�����BV����6w��F���Kz������c�%��mpF0�Y�<�8��J�TLU6�ߗ�<ƕ��(�����rw\�U�(�C�V<�8����]=V��I�z�9|J�g0��wZP�9��2�JV�~;��B�=�r�����q���X5���5�&�nR���Nl�7�}��q�Phb)��v8񚸘7lͽ�e�o��Ht�IR?��pМ'�v[]��E��4!�>�(�F��T�HP�����d�=lj�u�-y{��F^�o��Vála�����iD-��ݐ�L��N�!�V����G7}����>�y �"��8t+C���F�u��M�[$ʉ����x��Aߩ��g_��g�����c�X��Q���fg$�r�@8O�����`��$��>�wHz��v�`" :9��B"ǧ�|[�yB�Q��(-^�V>h�n}�� $�����D�k"�Z��˪(�*�rq�]mj�͉s�R�xB7Q峧mO,�[u�-�{�O�w�>�-!0�,P���e�/�����~o��Y�F*$X����������:��t�1'�*���iF�hW��S e�)Ӆ��q2{-�_����[ G;�Ѱ�hb�4�V�(]��������bpD���9��J�0�L�>���@ ������P�l�?����
?^&�"]�\?�f���I�w�Ĭ�7�~9Rf�ENY��|���:�i&�h�҃���N����y�����99Δ_�S��5��oӴ���@˺Ѧ�接���D�� ��m�We'{�"����ŖY;�Y���Eمf�z�t��a�_��^Q���Wjkٹ��k,�/��׻%��&{6� �8?��|�z":\p����|i�u��pÍ�C�n�S�l֩�{�X.F��M43�|��i�ך�y���_���A����H�
m�$hs:�/{�|l	͸n�{����H�j�}تǵb~�  ��W]�9J��/h��u���i�Ďv��퇚�B������hb�~;;���@<v�VfbW�����zpS�92d��t!������e��k`0�!w�g��|��s��7�s(��\���v��9��U�ϗ���kQ9:�1�V�̊�K����n'b�i-���:�:����|#>�@�^��r=Bw�¶�7ݧ���|M��Y2�g��+����q�އh#<ᛨf�U��	1ro�rn��aq��y���^�|�ϗ��s���eޕ���6�/��y��H�%�ydH�ݗ�7�\�y\���f�;_R9�T�A�Q���`&�?3�P���v%c����(��խ�\�W:��42n�LlV��Y4��j|�w
|p�m���T���;h�W�i�Y�j�QhZ�ɞ����F�k]�|e0n>��!<Z�}�����^wG��u�a��n����1k`w�3��;�x�q�9N��ߟ�C�ꋏ�����6�-a\M�P	a��-dph+W�f����q��;K�+f�L/ ��{��d(�Z��%�-��� ǗQ��S�}c�l)���p�Nդ5v�t���{���q"h�����U��*���,��'B%�
M=B����KEo�s���*���c5N�����8�����@8F_�<�˴��o�:r�z5c�п�A7�������Z؟�і�	�`��W����k��wousT���C��0��V-"{"�1x2�����TG�|DPw~)ݏ�[;w���~Y�ٌ����yG�l��LJ�NNJm�wX}v%�@�e�%���^=��-�@X�b��P�Mܫ�+���C����Ca-��ō�����~�v�p5u�������B>_Ȟ��jg��X7���o��J����hdW,�0=�k�}(�vk��m�h<��S#Ǌ�ώM�����Wk��G��r��Yx�
���0�q����!\=�5s��H)X�W�z�+9�6�~޷�<t�g�Y�Kp�e��Ӥn}�����oq���S��4��ֲ���`���x�u�O2��|V.[)>�Aʷ��?2U|���a2di�t��g�ķ콭Gk����aQ��
4��s�D�X�6�!�5��X{����9]%0���}���҃��i���	�wHh�bV�=~uJ�Y��	jcz5%�d�W�>x�P%n��:Ԑd�� $H��H=Iwq ����q�+P�"��#ݷ-��a���
��bn+��T��2����v�FD��(�q�݌�^��y�g^��sQ�:Kns��;(��m��~4Ս1;�Ƒ�)S��Zm� ��'�E�*=���2�q�d�ס`���/VQ��ɂὝ��<�0�R���a_��*�n��o��n�"u��FDP�v�A*�Ƨ?L�_��X��FfDFf:r2�W�o���2�.��.�NMpˈ��Y�V$��=,c�ʒ��60�Hb�P�dI漦D��@�* �ڷ��ؑ��c�y���T�s"%8#Ep��?���V�,J5M@�)�M��HF�񔆀1�֝"��#�G���}�W���^�\uw.�-~�Ce���z<�,�>6>EI�.��6I�0=�6@$�g�m�����HI��-J��ua��i��=Pêطȉߕ+oE��o��Yx^қm�Zn��B�3O����8��)���~}D2����W��T��}���ؖ��a�:���    >�uf "��##��+�U'�"�,��Ͷf����yS��٢��l���X�e�´��t�&7�+�0�_S������qM����X�(��ߣ��CF�-��S�a��X$�`.�e�t+����T�ۣ����"���|�<y�����*��5�M�S�q��[�Z�z�k��Ӭ�Tu&�j�d���c�(䓃V S��"�,9z.ǒ�;,��ȟM�F��1Jw�L�Er�6��C�3ү�ɐ����)O�R萏�e9�a]�p���XW��*	sq�e}9�vr�/��a�W&��b�{o.�U <P�1�����U�9��b��B~,�zz��X0�y汳�q��g_c�|�Od;��+��_90qDnQ�n���`lOɏ%
��w��H����i��0C��
  �?�E�%������k	�r�9��~���mӍæ���w�\p�{b>�eY-�-' A�s0xc�,=�o��H��}J��r�+0a�σllC�g��]7���qY{k�6����3�t�������i��� ����G����_K�?"�8�^��>Br�V��x`�lX�zzYh]F*17��ND��g9|�if�W�rqֽN|�d��?���܄�v���uٓk�o��M��G~(��.h�����+�}7ޖ��E��ݕ̱�,,�8�k�{���( �o/D���9k�Ա�
���|Q��2��:����B�rx2���m{YXr�
*/��,������@T׹�G��o�#�g�NWXJޜ�jN@��~�4[\O�r��Ly2�N	e���I�N������7o�r\����V���^�ڗ���W$R�)q�l��_�nQl��ni���$`��s�_ J�4^�ź�O4h�l|���ط���$��$Yt��?��2kK��1e��r��L���D�1r�E����s��o$��&�d����B]�����p����%{��-�	p�Z�
CN/w�m�4F��˜�dx^�0Aф̔����g|��]S7C�ww�=t��li��b�΁0D ��?�Q�Q�"��!�T�ީ^�"���6^V�o8}��	r$ف�D��\�0���DAHgR���c�۝NnW���Wܗ�
�(�^�TE�o4�E{I�RDUE��� x�Q�������D���g��+Ս�t���5RyY�A�^4 �3��k
�y���?$K�uS.pJ�B��:)��v����?}�G��V�N�;�ssXrA�޽n浉fVlς���r���	#��z��t�#��0��΁�+/P���B�&�k6�����`y�E@gͱw�p����<�G$�˺JR*�B5ؔd����y��|J��_�5y���w8��w���g(̟��u
���ɂWY�o$�ӣl��_��<E��
l{�6�y��|%fHe��A��������#H�H����dN�|Tũn����bCJ4�ɛ::�� A���)�o=����s�J�Gjw�UgY�Τ�R!0���`�5�ϥ.3�ۯU��g (�3�DA�C���|^hb/�=��s;Z�B��qB�g�|L�YI�Z�0��$�,܏�8������s��
����=�s�u;��R���<�~�5��O��fR.2M&,S^:3M0��f�6������o�mU���<E���˃���V�����em�֡.�d�~�Pw�n���Li����v5�%a�� G�"��G0�a�I0�Eh��N��G.�t���̛[��؉I������a)��P4=�d� q���
hA��b���F��\�9��p` ��Z�$}w��C[�'�fNn�?Ty���E����>�v��� �bfc����9����$>o�֞.�^˯�'h�QlV���X[�}gK�
�0��jg~�6��W<]޹��7�܎}�4u!OD�)kN=A�>%O�X�F���X;��L���@p}�`c�u"`9(�)����ɗk{�Jק)������T��vS��z%ո��{.`��	����R,9a��{?  �͛V&+[�?��H��O��"������b��6��q����A�������5r��=��z���U ,{�gJ��u��[OGU�M�������>>#T�n�3���>����ܮ�����Y*�{�W�]1b���H����/�͌M^�̫����q�˸���ɧM��lS
!�3�X�̫��o�sm��9�g�M۬ ���bs�d$�p����X)�MPc�U��ޣ�_�k(߬�{/D�ZI�����&�)�,Y���
�N���:3�ڕ���1�N�Ǘ��$�-��H��@Y퐠H�s�G/t�v���+��B�L
�C7��,(S����������M^�r�s��5���|���p),�z"�i�7S�B�G�B�bO�3DnpE[tJ����F�}a��r�=�0��M�Q��}��"�䨄��W�X��ǖ�@znu)�T!1mܝb���Re@�`��%:��ѣӾ���^���%w���ν����I,��������t�u�ǐ�HD��c��M@(�/��',�`o, �����<B�?� ȿ]["n	^i��v�L|�=�hO�����%�/gG��s��F�(�Bp�rx0a��7�O{C�:���%@�K9쐶`N���/\QiP(�j	�S;<��t��WZ�Q��-�.M�N�����LQ��vfJ����dk����(��PE�Ǜ˾�Ke�4u��,�jG ��뢓И�srV{�[��`S�l�W�&i�* XA���`�O���+��^��%F]N�nE+��[��©��bd�K�˯'�w
\1�-�22ue�v�~>�Ĭ	�<^��0��s�_[����ʋ;�c��h��]}��S�[�|a����h�q�t�V����Ju|�1������h]��juO�P��fkvw̟����g�x+ij����&P���R�������������1�/0e�Ż����u�������~F��(�e�g��p��~�T���K�q�M�;9�y�t_�Jn�>�&/����|cu��B��
:"3��e!���פ�)�S��CZϦ��Oz�/'����d@�}��Uє�4S��L�e���[.�ا�Ǝ�}�#WM �H4�vN�����13?c�z< ˮz�p�L"�y�@� t����_���b+"A5��N�0�C��V�T�jo�����.�A'8C���%M6�(HBFP_w��3����Dn�	C4^^�ڍr9A�&=�xP{�kD[5�pM2_FB�ӧ�m0 �ѳ���TI��(mU��g(�\���~��=c�nP%�
��������q
�Q�26wm��mrL�<-�������v�����J��p�TS����rn�Y��Z_�/?=]��k�K+x���6l��^v$B �%Hd��+��^�?2\��Q���l�c�A=��������l���""�𭅕��폇��	&�)y����a3�{�C�N��=�����nL`��پ)g�����`s�� 7E��lx{T�U!\x��1,� �_R����d��T�d�������	HHG'� Aj�#H���Zx������M�z�Y���`1���I�]^�^:������6���8�[�"��!�c�Y56đ�����0n�!�I�P{M<=���  57߱�4��=�y�*i���{+�!- �8B9P��@�Q
�4t�N}q����Pk�I��߉��ߗzT�Ro�����{\�
�X?vn�_Nf-�Q	J��2�������M�a�˪truŎ�U�z��#��٥��~���3,uP����6���P\Iŏ�k3�r?CȐ��oɸa�Jp���JM�%����c�U�_N)���	,���3e��@�V����*�=M'����am�LWh���]�R�{�ѹo!*�X��J:._��i�}_���쨍�Z��5�g(���q���nm�8�|Dz�ǐ�IF���%��(���p*w�v���`�ތqga�W���K�:_��    >���+�J����֐-�鳵�����]�i����L�����}hAg�uP��':�3:?����[+[w��!̺1���yr7����!�.�caϧ��jk�_�փ�k��*���;G�2x�/철xq�2g���+��9��I<�m{H��S��K:�}�����(���~��r��op���ɪ̞�ʘw�	�9�m�#"s^� �fW����	��/�xe�~�l$�Ce8���ڬ�����i�-u���]0�Mic����l�\D��k'��k��&��$���nh�{H���J��ck-'$�M!�H^��_?�;.����H� aO$�z0cm�pCޡ��f[�k�o�L&�Zl"+���F5y��W3���;K�j�<Ο��3���rqa��31N���4BYk{�AQ����Bv�j����H�4E��ΐ�I��� ��fT����X��w�^�.�E�?ĵ����ZcW�[F���=�~6�Q�oLPc�s{ ��3ݎ�]y����li;6ɗ��glj���{�`��s�A%�D�����UL����h�g�ġ�?
c�3䜾�e�[\	,����}�%�,\Z�ع���/�p�U�
F�\_��d�zt9�O���h�cU�3f�!3�7d�` �a�-��٩fʆ@��M�������N�4�:-}tеM�6J��p����f
;w�n0��/�D
5=����VF;%��+%�� �br���ry0,ō��(O�Fnk7Z�7�IնT+�؍I����1,6KA.	���x�ˈ�)�.����&��tE>�i�s���FM'���۬*h[P]]y�6
�`�D"s�t����R���fʞg=˕�Ά� �yJ#0��J?�U�����%z�X)��$S�x}^{Ǟ
A��q;�χ4���ҳ��L�m^���5/�[0l ї�A�FR����#lmu�'例��9M+�qH�d8�g0*�R��OD ��X]��ķS���S���H��Ah3��&�!ԧg}�4��ƻ`Cg�^���v�y��}ql�����nٛW D��%%�K3_���d�L3
a���]�5+�+IKlW��5-~��Qp�D�iV��#h�-(S������{/��"��1�����vX����4)�{�.ZmǦ�z��7V���"�oI���.n� !̛�����0S�I��,.��3�$�dBo�Eoϖ��}m�mY�|e&ש�\�Z�M7p0�Jp�%�7�A1�]�<�w�K�*�>�Z㟡�0R)��]�uppd�W-{a��~��<�ɝJ������X䴹X���P�N����j�aǗX�g |ƅ_%$����ѧ�ٲ��YX���9�87L'I�	�ca�F��K#�;+3j��� �RϺ�^�_��B�GVԚ;�2�d�������W��� �S�����!�����X�1Nh������-�ݴ�d?f2�pu>�9aۦ}3D��C���~B=�u/����v���rEL%�0�l��}� ��2n8	��%�N�� �5s���ұM�y�4T>-�ע���D�����$�<�.�||�⹈k}��Y���)v��gf��Ǡ�\����<�π]�i��-^���{K��]8�h�e���W>����ٮ����T����y/ؔ����yc𣾖}�B��2������GT#P��0l�ڢ��v6b��C�7u�$lQ,?m��ޒ� ��e��/j��xq��e��S'�{������)W:6U���>����̲N{�������$��~�
��E����$�M/n+/�H��SՊ�,"!�;�4<�:�E�;,�7�V�0�D7Y��{&��aM��kL��W�L��\±	���$�e�i=X|w��ʉ�k�;;�ND��L�0�B���� z�sc(���t��0����Z����'�S����T<+�GVTq?T��4o2���Y�0��q+�R�s��Ù�L~�����w<SNy�`��"�s����z�#_=��5�>I�>_��=2D`�r=(�Z����{׾匙����a��I�y��4�Ԋ��6�c�;�А�xQ�}5e�0p���`{��Q��P���/�o�[�r�P��T^Y�H�?��g(����Ro��E�7�#�i�Fw��=_I��z��+���Z�܎P�a�`�� ~ɗ��<tp�N|�K�k�g�_v�o2wl��8;9�NB�������p�����^�odEa4��I�TI[�����6��+^�bxl�+'<]�
z����<t#!��v���Nz$�w�7�羓I�U��UI��tݔ_..���������|l��؜��T����ZG=�����q�� �����0@=#���1	��J��݁����P����ݎ�؇�k`�	�;�QK��ȏ���<���b~�C����g�\Z�Y��~0c��{XK��0�jQ5��3G�3;�
����l�5�o�<D�eK���%`�M��e霗\ˋ����|�`-�3tk�E�04%j�#5nu�"�@����j��s�Ce�/� y�c ��"�fV���N�����T$�G�&0e�����
n�Omn���ɶqO�1`-����m�3�3�[��3f��U֬S�����&?��@jA�e�aը��O�)�x�p/�d�H|�nܬ�g����Uy)���t�IK��Tדˮ�>�1Ԏ�XNBsUE������h��-%�6Y	�Q:}��u�h��8!"p�}y��b�u=�pN�Η�m]��Mڢ��\��]0m�By��;�NF~����v�i��ě�ԍ a�����"X�B���#���
�j�7�)tq�k_�K�M:/ܒ�e���m��G�U�-�		3��T4�N9�϶�g3�/ �k�'C��Vn�����]����nW�h��[g�qv�,�_~�$Bb�d���z�o��I�����݆NtMW,�c��V�="���	�q緶=��mz�U^�(��3���L4|ނ�&^:��e������X�.�Μ���>��X��i��{��.-���A���i4X$�`��'b9�&1�|{"�D#�׋V�)�����{��o0���������>Fڙ�@��8�1TQ_K��~����\s����L�.�.��4��kN'c(,G/.�0�>���ɒ�۹��j9�0ǐ9���Z*�Os�U��y���k:���4I�05Gހ�F�J2/��)c;A�l�|�����؛�S�X�E�����ڞ7� ���y{!��.���P�+�� 3���:�V2�oo�ǎ�f�?~����q�	*��bn(�r���s[�'W�*y%���	��R��-j�#Q0H�^` /��~x�t�������Xh(�������k�ZY��.���UO&�{iC0Yy'Ǌ�Y٦_~��1�f�_?��K͸���ח����{��Ŧ������Bo�n��ęP;SE�ɑ_n�m9v�H~�\楲��^Ҵ���3\��Ljm?3�:�7aךg�Lۖ�+r,�b5�\�Fr�kK�Ȱ���P���`vY�2�����Kus)��e+v��F����t��0�C�1�v��WH8釐�"�o�a
�q�Q�^Z�z��g=�)O���������&����\=z.�#��aO-��$�:�A7�1�g��)d��9��l�h�w!,�i̼�� K�~첪���T����g%�No�jA~a�b�P&���0eꚀsu*IQ+��r�MO��/���� ���G��~F�HYi�e���N��m�����9�P��ӇUM�ۧͮhZuܲ[�q��N{���}�@?ũ���``7~������]s�3e�{U��a&Δ��<��7IԞr�Ca�^n��8��+v0@Pc�I�}�G���~�.�1>�}��������ly��p��y0C?��J� Z�pL8W ;��/TB����`��)�X��f��F���ߐ�qP��C;�gu[kJ��r����BV�g{���������9%�%o6�pM��$z����ݴ�jxlqV-��B�,�jt�7>9�ѹV�    -��MP�ۤ�w�"=l����%3��U�@j8�p��ַFu8C�0��%<��@D|�x>��1�3G�	_�[3��~P��t�A��J&���95���m+ �Z��C��v����fwYGzN���m0�=h����]�Q�#�ҕ���C�4����Wh$?���}=�N���༑C���=���0A�E{�Oǫ�j�{�S�0�ʗ�?΅"��U��>��-�$�#N�����F;�FT=
�c�Պ��RD�w�վ8�������Kԋ)T���A=�ZjF����@��(�l���ر�0S�.�{���!pAW���G��1��ڸ��퍖�*i��P��?��82��n�����B�g ��K����+��Y7����Z��ՈN-|D�q8�z��O��ݗ���[�T5b�Q�t��ѧHө��XD�~��0Y�Ɇ��N���֩�9�����P�O��܍�y&n\uI��� ���D �IwƦ,��-�����047\%��*d<EZ>R����J�{ՃM"�F�t�#J�KVn�B���,�Y'�[n��GR�_��Ɇ�km-41���i���:EΥ�VǠ�7�����eH\�r�x(�{2<�)��Xw��@|!v���j�5��UbQ�X�l�	�����M̠���oC��^�
b����!��E)�����|t���,����aq9<��,K({���+����D�T��_;fk����e��;��Y{եv����A�eӔ_�t�p-��]�[o���e�Ҏh�"׽��Z1G�|�?8��R�\^#`���,f:���?��5���?s�aQM�]�E�zߘ��=c��J��I��J+�=��V���T,X�y�!<a�ȥ��x�<��-��T?��de�h�C�J����{�lI���+�ú�2=�*���:ET0=��3��|/��⏶ػ�Ve|��)Í�ܙȰjc۬�XM=M"�J�B}�����@߫vg���t��<��!�ߏ���F��Ӽփ�v�G0� ;�I�:��)J׏�M�����y�<����]�d��J��K����P
S����}�|���RM�q�uA�K����ѿiJ=E�p5�~�iJ��vOf�@&'�	/��=�~����o�":��q�5���4�Q|����柡����ūږ�i�cB}���!�A�=��QX[2�e���{;*�4�_5J0�L�đ��}�y����,}`��[}h:aF��ꔚ16�s��
I�d�U�#M�}�E��	�� ဿF�ͬ����?�����pV��蟔ܹv�+���Z�E"Ln�\)6H�=ғB�PF4V���01OP�}S����֯u�?< !Mq�G,��5~�zs}t	z�C��j�e#{�
��V�v��\�}^��Ҋ벋Di��G�f��>�)�g�����s����ݾ�`�z
eR:��Y�gc�9��F��#IJ�Vr�\��`��o$���㼳2^��]�[��d�q�����Őz�iY�FŞ�ֺ�G'_��y}8J�Z*yL@@�c6//�ڻ	ҳeJK+����w��e�5d4��.>r���O.S��4���W�g�'���ǾZL�&(��}�X���ys�k3PH�ض�_�ѵ�a���h�C��0/��AJ0�{��'ޯ%����O#۷���&���e�-�i��T`3P_CB_< �-�K7�Il��T����Ѽ�kr}b�����Ky��CA`~��C��EΩ�� �� ,��rw9�5�\g��'?��_���uC��u:2�	�!�b�D�q�EO����'C�S�&AJu8�g0J�P��y�z����wv�C[2ϊf��A���m��%���'�^GK	�����!��;���jY��V�g,]�]˨y���~��t�yk��$��|w�P49�4��fz�^��N߄C����9%oñp~�$�o��%�ޖ�Z���	���d���2���#s��^g�-廘��1.�j�"�yC݄�?���	�F���e�GY�`m��R�����%{Z��[������c�Sp}���;,�֨�m�]�cO�����L�B�
�
�0���EM�)��(It������HG,�|ټLiȯ�t5lΏ�>��7e$� �s ;WKj�J�OU4�|�D+���-�6+��B�yvw�>��q���P� �&�#��ۼt^k���4e��8���N����G¦�]���HGhH�q
{`���p让�-^&4`�e6.��F��I���� ��g0i�v�D�M_
/�����e�=���=훈�a���n$�F�Q��˦� 1�~�' �_~��O��ϱ�S�G�M�:<Z�tI��8Q_׈�N�W��~��o�.�����q���H��r��ee���H1�a���`�)
q��<}��{=8�f���8v�	+�`���ǹP�o�p֦0f�2��͝�旓��uҜ��@9R�o�~��Q�)���R��=;l%�H���ܭ���.�"8�F�]��J@�cJ�*�K�ݱW6�{�rG��׼^S��<��ƽD5�	-��-�XRY�]�/$F"��xko�ˍ�#h��A_l��;�����}�ɿi�q�≊���2�!/�F+�R�g�-n�,��w(း��El�B���5ͷS�slM�ľ]T�H\ʭ9�?d�a�A74�<��U��]�]~�$���8`���-`b0�g8��V_�����<�$�$;.��|o'Lt��:�����я�����Y�I#�Eo�]���-�?��~��NX����|�+jg�1��\{�J��9�ɘ���#mP}}|a$0���`�7��5�~e�����dv�IH�^ѧ-������=�9w�À��������0�%��`�M����/�����<QT�+(�jJ��R���dR������M��$pZn�6�oW������]�'H�ez�N��R86On�h�R&;�QAQ�_��%�Ӈz>k!/³�[C��]�T9��>ģ"�"��47ɼ�}���(r�����oœ�ù;���љ�R�kq��v�<TB���Yc�$�2�EU�v���w��~���a��� ���5`��<��]����+U�p�0�[�<B����4�z���)�>�tW�=�氳���<��2��X�s����(��h^�
=���0Z��؇B7���S��!E�U�ܱM&�������^� ���k�<�
MehN'sv�7��d7暠p���z����rIA���x�_��!�٤��5v�&����k��K��L�k��~JF�oozG�J&�pxL��su�\H�2�mC�8�F�sEb���(B5�v9�/�� ����=��� �'_� ~��KI��t��}Ԏ�?Tl�q��&�������n������Q8��R/x�B�$��B`�}��f��Ժ�S��Hl5>gQ	��$e�R��&�;W��1�WuF��_*�rH��$ESJ�� �_�=�ӕ�_� ���/#�����&�w���*Zt �i�v{T��a�b�qc���fe�و�3e��/ �Ir��y�])e�Η�������]V� AwZ
(�n2Ԑ�8��{�D����]HZ��%��M�.��ng^��ߛoV7qO�k.��k�`D6����J_'��4��7s$�:���v߲��+3��@9��T^��/l�&�\yu�{2�����5��EEb�
�|��q�O����r=t������D>xk��NiZ�$?bp�O��"}�g��<�tǸ��]��FL�A�e9�[P!��MXi,�+��v�34���/y�9c3��j~�rq��Ų��XK�uD�[����xw-"1�Xg�i�Ra��Cw��r��3�/�D�8:�y�A�9��Fы����'n�ʎM�G+W�]�z����֎c�o3qL�F8�e�p�=,U�h��wBXk�|Q��}Lz?Z�G��%Ge�	NC��}S!7�I <&�)Grh��|���0r�&�q��K1݄e� ߗ�ֈ���8    ��`:ؽ��d��F�aؿ;2��"�S`�?Q�1>+���J��������G���f��~� ���T�8�^���2�����߮��
�F��q����4N�Iy\�}lK�ի��z��R�
��f,��"�,�����//(��C�M9���,�Z�T���ګT�����jM��ƹ���%+��$1�F��F��M	��������[0ӕ���vpS�b��XN'W�C�}�'��D�:7y�:6��q���_�xk�Ơ5��?��������5�t���lmՑo�2f��6B�b�ڥ"�+�d���XF���o���y��wW��o��Gha��7��v�#���n��aJ�$\��mp�G�j'��Si�-��&8`��\�l5j���AU{���o��k����\����]c���U9y��;��g�֟z�T�����N��Tj���;-y���/;�_l�3���H(���V��D����
���<�'L%�ʂ��ߒ�!����g�$<��S�x�e���V����Y��7r,::/ASm����V�k�md�%F�����qQLu��Ȼ�
�j�������;��|�j�]��p{Xx�d��4�
}�E���H���t8g�1/�xB(B0o�hj�\`�oKb7%Ԁn��x���s~��'�Vү��XD�z���=�lR?b1�oD<�w�����1;�]m�$* �>����i`Jp�#�eb`ߞ
u�{;lt�n������bյתg,Nz(�;�<5���s��AR9�g�̪�1�d#����)W�H-���������F6�Y�y�(�ߵe?�R0�w �m�`*�z`�U���rŻ\�r�t���]l<ݢyԖ�d܆�o�G(�î��drp�T�L6���R�%Mh��W��]�����;���DI� ����'�z�Y1��̓�A��b�I�*���@.�TLP�7%45���jn�,Srr��&�w�~�^ݭ�fYɕ���!I��d�gGi��	aݪ���/[8t
����8`����T�ŷ|;ϘM��3�`NO#Ï�gr�ݸyE���v��U��]U�.Wc���x�,�hh� ����&�Y��t�yE6~�U�<�Ka+m���>��V��m�F�M �˩�dt������x��0�2 �2�m�`�m�1�ѫ��˛&�Azä�Ql�@��A��=�AM�)��qV���kf����E6��$��``��Ԧj�q��S�Z}�R*��������!���qp$�o�H�Mm Cn��ٺ�J]���0
���Ԑy�+��� ��4(�m���XI�v�y��Z��N[m�����E�t��mA�U�90�r�Ώ"+����[l>���;��5d6�昿 ����d���5W�C� Ί˅�� :0)Fz��.�B2�A�/���؅Z>*�l�o���N��W�r˪�r.σ��6j��Rx?�]��Ncx�j���(�����#��؝�����+����`�E�]R���YV�g(�N�v���W��8�|�(�^��N���y�G���\�h�C�����)�|4������[d�M�o�c�͙���l�����XD;��X�H�M�^_1���W�Tã|TO��)�#N�`{+J[Y`���|,
ߧj^@Ī�c��ɔB���¡�R_��lW�vjB��/�egI ����Ӽ�0�Ё5��9��W>��a8w5=��1��7���X�l�g�����������Ƅv$������̟%�� t���5o�����qkG�A�{�w�G#��ȭ��ju+D���p�"�V�l�>7��/4@���ym���&�N�kaٗ��B�^S���:�A&��B[�n��EO�GUOE��lU�օ 
{C��>^9(A�n��7���S���wB���J�����+�&����C�|��ٍG>��T��Pz����o(5�k��/�ܘ�梭U�Z��>wF��>d��-K�Y7Gٕ��sQ��/JV����F���*�Z��2zr��?\�%S ��ҡ��Ay��a���i��i9� ��p{R,İY�eMũ�3��)�8�b�9M�5b�����������>�i��� �k�E4�}h��=kȨ�)���B�o�0H����f�H�u����t��VͻN����:���Ao�=�7�hC~�v���~[��6���c]�c�YãY~E$�=7��!s���{<�۔_Ne���ј���)�+��?�Г#/���	��؝��l�367�?-��OP����8୽��NA�7=���n�x�7���!�s�>Dn<7^���k�B�dG^����8GLڷ��Ɲ�-;$��o<��6�dvU�I�����q�
�9�������A}�#+&���FWm-
�ɍ�鏽���GCM��}_ wm�9�ӱ�Y�|9�zmb�~��7g^}����V��\�x�0�h��c�m��#�7R:&$��K�1�o�����y|�Ûp��^��y䇝��:�歯�!*+p�jC��^����q�;�rL����Ka�x����g3�i�}�\�葵��Ǭw����;Ǽ��&յJ~P��o���<Z�r�09 �|cy��ά�$���ﾈ'��j�V|_<;e��A]�)3�j5�̛k�3fQ:s��X�Q�-ċ�6��ɤ���v���!�3oG�_HL�h�bV��G����NA!���T3�Jl��J�+�w�f�Z��G��bd�����\��I����z��Ow�# c���3EV��d�>�Mj�L단e�QP��t�W�_U
���]�Wڙ �5|�<��z`sr����A3��1�zE�72��C؞0�g��uUSS�T<�Cx��!a��e'@��o4�'�9�x���عe��h��,N��v����[Y�BWQL�p��9j�^�Ү�hc*8���U��Ǣ�Э�&.P��/P��Y��.���֞	������X�S�I1��bG*�xI�z�n����S 3�7/�ڬ����Ӧ�@�����ϣ��Ǧ�/��T[=��v��*S����5;�IaR�T����#Q�{� 6f����=;�jЀ�F��}�$6�{���yymZy2�v�Z(�s+�!�q�4WtK/��z���؋S�<�?�����X�pcp-��:��r���'k1N�[W���Dmו�w.p�0��\�H���`1l�L�K/}�者�ra�g��]�~�"��kW��X-̚��
q{F<`ss_11��z��NY+�>0�0�H��KV���c��5b�ry�W&{u0��,߷Tײ!Z"ʥ6Jx�[R�n�Ar�, q���Kwm�+�B�R<Ι�������	L��N���!��W�}�6L��ʣ�Z�nO����Фa9�cp
��	�}���HA5�r�qd�)3G]���'��b�w���5����#��Q��EE�r�����'�kx_�k3�ǞB��W�'_���!���f�r�m������36��N��"��Fs�u\�t$O���$  u���)�Ko�0�N��2*���6ư �U!�
��-U�,:�����!}3DDQD@:q��Az���jpS���Wq���_��ɼg�𨦀C&��*�Xk��	
�C3E��5d�2�'K��:ع��ߪ#*�^�XB��g�x���?�%q��t�3o�.b�@*B(h�=0̢�G|6��y�.,2�Se�|W���(�粽5��A']�/n���wB`*����8(�O��"^�&���M�H��K��gmId���oB@�U��X��
���,WNF�Q���ʩ>�6�El�:��[P9�r8��0��u�',��;Z�g}��������������&�Cr��g+T���G�>�!N�0�ǃ�?����7��a-����"1	���>��DiVT��H_�K��'iN����$T%��Y~ֻL�$��^�.N�JWey6���ù0:��^�)�����4����SzxVu�����4�$�u��iQl�w�V@��:�    9�����>���{���a�&��L/I�GO��^�A�_��jul�XΓ�x�oW��f���k#n�P�pw�9�"�Ɔ��l��sAta� *g8L.�t�N�����Ri��Eʐm�@fl+�d�t8[�^��ލ|�>�R��6ȵ�	�B/���`����!<9�L��{� 1Y�S!���������!���qIV8R�O��j���6/,&�0��3���n�}�Ծ��y��/'#Ў^�g13S�יCı �t�8a���J�`d�M\��y������"t!�
ے��NY�!z���w,�n$��^�.-��N�+��Cy�\)s=C%�@���xۏ��G�j�<���-'�������`H��cz���.E:���r�~��w�L�i�=9=�=
E�����yu@g�����A/u2�s���0䐿b1e}������J���d�7��VQ�\Xcp?1���4wo�1�u/�N9�\�">�ks�{���_����I��;RৌCao��^:
"�������	�	��⎗���A��w~p�=6J��\C$��<�i򙟂�_�׍~��q�r�?.��>�$A-�G�-�/��gL��N�c�}�^������FjYN%f��?��������[�_� ��K�%v�/ۍ�W�t����.]��X�s]����Wi�g�"�6:7M��әb�����7W��O(N�������:Ab������q�i_�������r
@�`���)�&�~�1xa"�F�r8l[��h� ��;���C�}��n�|����M���7�~|���kJ���=�gXZ+$N@���K�߹��f�?LʧE\��p�O�����-I��zl��6��o
֟����'X
{��;"o�SΗ�n�����ր�6ld�<�inغ��`J�k���7�߆���|"���|o��2,��<�4.�uj��#QS��a`�g�&$@Y��T�CI6B�m�
�P��y�����6��*�ޓ'��#|�i�=��|=��гth�����E��������#'T���� �V��QAӪx{=��:��PM�b�<�6��GY��RP�lf2�$���n�3�x�&�߼��rI����1ˎ�XV	A�a��ܻw,�)n���Qb��`�m����ٵU���2�p�E&%fEvX�j�������Ռ�RN�	3�nH�StM�
Y|�g�mJlC'�<�����G�?y\��h�>��D{�~>�g��(�5�� �	��֖"h���iʑ�y�����.�@{9���ҩ1�KO�1"��b��:w����.��[��sȫiv��-^X�@���_	��P I$�өx�������Bb����K���:`��N�:�voW7&TQ�S��Hu�h�?�@p|�!>2ls%��W�-sҴ	{'j��a�W!˷V��)���e��6Q˻�_�.T��Au�x��h>�����GY.n�'
�����$
��w(���gr?d����N	e�,�� �u��כ���L�� O����1�B/U!�ʆ�O)�HAr��_��J*��:�J�]s<V!��� ?ż�G��	7��P~k�Q�x9�z\5�?�
�ʆ�ȱEh�֏�F�7�H%��^��u��oĥ����2�a���mBllci��h[�NfJgg�b��6��*�|2���їSA�-�;A����ğ�vi��haS*dv����o�G
�(��u�p*��O�l̼����]��j~����X�9�)��)�hb�("bV�i1@���v���'Պ�m=�m�%=!>�eˣvޟ̭���w(ϫ�D�S	�d����,L�=t�;�����xs6 �aЮb�*���ܙ%>�lˤY�7@�������QA<��_LW��s{Z���OZ�C����e�ϊJ�I�����4B-��(�E2|����E����2�Λc�����Z�Δ��/S>M�%W����Î}�}ڬ_`�D�y��ȱ��R�6gʘ�����Pv�y����>3XoX�Y�BƸkCK�(��t/�� �5�W���$�p����:g'��u���˕���[��ܽX��]����)�򾱕|�u疹�:���u�YS�P����e�i !���D_��n�aa�X���U���ɏ��t�e2z޳�����BELO��6�MI�ld�F=g&�c�s@2/ʿD�R��o<^�%�|_I��mNm
T���D�^��A�>}�]�n��zс�"\t��6CJ�Ќ���M�����ҵ��v! �\͂X��.��e�ז��<t�����լW�(��:#K3e�Q�8�ӹ��7����'[���$pK&�ķ�V�m��=NzXa�O���0sC�I�kC��Ɨ(,��sJ"D ����w����/�h�W�z	Þ��`r�79L �:�B	����RÝ�~����u���zRB�8��~����-��"* Q��6���F4��A=��^d}�"�}+9�Y�]9�W�����[@�}-��q����d�f���ym�Z<&w� �+y�%�6��ɞ�pdo���+��'uH�	L9��)Mۈ���9%~��D��V�'PS�6KV`�mш; r�|J��S��)�"�����U�/Kj�܍�� *��rVܜ�������yA�(-�u�G��Ҍ$?M�Y�����;U�al�����UJCX��N-n�w��a�+I':�ގ=�x	�4��ء���uoIS�x(�#
47���n��?]�<�ÿb�Nw���Io���ė~|�� Jː�������N�f���V�6���-����F��^���n�D��;g{i<�?jw��?`gg�j(p���12���^���8��.�Wh�����#�6+i�
/�L?W��;��귵��F����9B�(�p���:�Fhki���h�Y����j�ό�B5� kד[x���P�gB"�g�4���o�zIHJX��w��N�m\>�N�k$Rn�c���y���ȱ���9ӽ-�h�:՗����u�mGc6�K1��f�e}�!����]R����E \�a�itBC��N��o���h
��(QS�_nKga{M	���I�'��ƣ#�g�>��%�K@�F���ؿ5g�Џ��"C"�L�C�-7����Y���j� ���m�߀P��Ӭ"evDz$�2� ���b�q物:|Ca=��R�}S6+��!ƈ�x��ec��Y�X�Ϭׯ`��IY�a�OI����B�X1��=^�^QqT�Zx�� �z��+6�Ar) ��7|��s����v*���^=n/,v�	��&�!�ϔp}N�'B>��:;��t�\d�� 0(B�j��gۍ���@� L�M_��y�_�LA4���d�O�l���ljz�<����#�s
�h�i�am����E���E7����n��3�7���7���i�v�dU����r�<T"��wȮv��}n��c+@B��Q�n��Z�l�qS =�;۫�����J������k�ɬ��pD�_[�..#����W�r �A�eX��D�?#��/��"I�/�	���}�Cс���t/���z/��!1��dC�z���@������$N`卙߶9ٗ?;�x~33b����jfޭ��n�Ե�C�'Z&�P
RP��?l��eծ�^w+�w���8�/��~�#�񶟜�r��w,/��+�:����.���������v�8�^�̔�'!0�4��/.2��e�,����,�˵u�W_�PA\jMtm�:P9���f��3a1����e��;lu3!'���/��uc��?��)A`�eI@{	���|!z����"N4vھ�c� Z���^<���j�2�ԫ��6�%��G0C��-�e7fke� ��_@K�D��4X��5e6�d9[y|�l��o�~��]��=��n�-K�A- CM�|s?�ls�@*@��w�o��0�?Z:�[��ދ�w�d�����T����nƤ��srKy����V��	�dr�ej��6�؞��s2q�L~9b���..�|�êЂ���ɀ��|\�ċ "   li?��:����Z�ƪ��b?���@��׿��;�x     