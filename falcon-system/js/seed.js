/* Starting stock list (loaded once on first run). Columns: No|Serial No|Brand|Model|Condition|Processor|Gen|RAM|Storage|Graphic|Status|Customer|Invoice No|Date|Supplier|Remarks */
const SEED=`No|Serial No|Brand|Model|Condition|Processor|Gen|RAM|Storage|Graphic|Status|Customer|Invoice No|Date|Supplier|Remarks
3|TCN0CV010578497|Asus|A1504VA||Core 5 120U||8 GB|||Available||||D
4|TCN0CV010602492|Asus|A1504VA||Core 5 120U||8 GB|||Available||||D
5|TCN0CV010811494|Asus|A1504VA||Core 5 120U||8 GB|||Available||||D
6|TCN0CV010948496|Asus|A1504VA||Core 5 120U||8 GB|||Available||||D
7|TCN0CV01095049B|Asus|A1504VA||Core 5 120U||8 GB|||Available||||D
10|TCN0CV01E82149D|Asus|X1504VA||Core 5 120U||8 GB|||Available||||D
11|TCN0CV01E843492|Asus|X1504VA||Core 5 120U||8 GB|||Available||||D
12|TCN0CV01E860496|Asus|X1504VA||Core 5 120U||8 GB|||Available||||D
13|TCN0CV01E86549E|Asus|X1504VA||Core 5 120U||8 GB|||Available||||D
14|TCN0CV01E891499|Asus|X1504VA||Core 5 120U||8 GB|||Available||||D
15|TCN0CV01E89549E|Asus|X1504VA||Core 5 120U||8 GB|||Available||||D
16|TCN0CV01E92349H|Asus|X1504VA||Core 5 120U||8 GB|||Available||||D
58|CKB49T3|Dell|||i7-1255U||12 GB|||Purchased|||24-Sep-2026
122|5CD3273GR4|HP|||i7-1355U||16 GB|||Available
140|K2601N0045858|MSI|Cyborg 15|Brand New|i5 (H)|13th|16 GB DDR5|512 GB NVMe|RTX 4050 (6GB)|Available||||D
27|CXY9PL2|Dell|Latitude 5580|Used|i5|7th|8 GB|256 GB SSD|HD Graphic 620|Not Marked||||MMA
54|HMHRHR3|Dell|Precision 7530|Used|i5|12th|16 GB|512 GB NVMe||Not Marked|||||Stock intake 23-Aug-2026
1|NXJK5AA00152909B8A3400|Acer|Aspire 3|Brand New|Ryzen 5|7000 series|16 GB DDR5|1 TB NVMe|AMD RADEON|Purchased|Kaan Sir||23-Aug-2026|D
2|NXK6SEH004423003A53400|Acer|||i5-1235U||8 GB|||Purchased||No Invoice|16-Sep-2026
8|SCN0CV04A429502|Asus|Vivobook (A1502V)|Open Box|i5 (H)|13th|16 GB DDR4|512 GB NVMe|UHD Graphic|Purchased|Anshif (KKY)|12301|04-Aug-2026|SOFT IT
9|SCN0CV07580750A|Asus|Vivobook (F1605vA)|Open Box|i7 (H)|13th|16 GB DDR4|512 GB NVMe|UHD Graphic|Purchased|Colombo|No Invoice|05-Aug-2026|Muthoor
18|TCN0CV01E96349G|Asus|X1504VA||Core 5 120U||8 GB|||Purchased|Zainy|12413|19-Sep-2026|D
19|TCN0CV01E98049A|Asus|X1504VA||Core 5 120U||8 GB|||Purchased|Milhan|12417|23-Sep-2026|D
17|TCN0CV01E93949A|Asus|X1504VA||Core 5 120U||8 GB|||Purchased|Arhap||05-Oct-26|D
49|1L6T0X2|Dell|Precision 5530|Used|Xeon|8th|16 GB||Nvidia Quadro P2000 (4GB)|Purchased|Naveeth Trinco|No Invoice|05-Aug-2026|MMA
56|97T2W93|Dell|Vostro 7510|Used|i7 (H)|11th|16 GB DDR4|512 GB NVMe|RTX 3050 (4GB) + UHD|Purchased|Satheer|12305|05-Aug-2026|MMA
55|2SD5ML3|Dell|Vostro 5620|Used|i7|12th|16 GB DDR4|512 GB NVMe||Purchased|Mutharris Sir|12310|06-Aug-2026|MMA
24|BQ5MLL3|Dell|Latitude 5520|Used|i7 (G)|11th|16 GB DDR4|512 GB NVMe|Iris ® XE|Purchased||No Invoice|07-Aug-2026|MMA
31|F6PR1T3|Dell|Latitude 7530|Used|i5|12th||||Purchased||No Invoice|07-Aug-2026|MMA
45||Dell|Precision 5520|Used|i7|7th|8 GB|256 GB NVMe||Purchased|Akthar|12313|07-Aug-2026||CHECK: Serial number missing
23|9B7FJG3|Dell|Latitude 5520|Used|i7 (G)|11th|16 GB DDR4|512 GB NVMe|Iris ® XE|Purchased|Nafees AKK|12318|08-Aug-2026|MMA|Merged 2 duplicate log rows
48|FPZGPN2|Dell|Precision 5520|Used|i7 (HQ)|7th|8 GB|256 GB NVMe||Purchased|ifham|12320|09-Aug-2026
53|DNB9ZY2|Dell|Precision 5540|Used|i7 (H)|9th|8 GB DDR4|256 GB NVMe|UHD Graphic + NVDIA QUATRO T1000|Purchased|Aasik|12323|11-Aug-2026
32|1GL5HK3|Dell|Latitude 9520|Used|i7 (G)|11th|16 GB DDR4|512 GB NVMe|Iris ® XE|Purchased|Ninthavur|No Invoice|18-Aug-2026
41|CWXBFL3|Dell|Precision 3561|Used|i7 (H)|11th|16 GB DDR4|512 GB NVMe|Nvida 4 GB|Purchased|Ninthavur|No Invoice|18-Aug-2026
20|HP98N52|Dell|Inspiron 3542|Used|i3|4th|8 GB DDR3|256 GB SSD|HD Graphic|Purchased||12334|19-Aug-2026|MMA
33|8H575M3|Dell|Latitude 9520|Used|i7|11th|16 GB DDR4|512 GB NVMe||Purchased|Naveeth Trinco||19-Aug-2026
34|9N6MN73|Dell|Precision 3551|Used|i7|10th|16 GB DDR4|512 GB NVMe|Nvidia P620 4GB|Purchased||12335|19-Aug-2026
42|4LCYQL3|Dell|Precision 3570|Used|i5 (H)|12th|16 GB DDR4|512 GB NVMe|Nvida 4 GB T550|Purchased|Afzer|12338|20-Aug-2026
26|74MZH04|Dell|Latitude 5540|Used|i7|13th|8 GB DDR5|512 GB NVMe||Purchased|Trinco||23-Aug-2026||Stock intake 22-Aug-2026
43|4PJ99S3|Dell|Precision 3570|Used|i5|12th|16 GB|512 GB NVMe||Purchased|Shiob|12340|23-Aug-2026||Stock intake 22-Aug-2026
50|3FT26S2|Dell|Precision 5530|Used|i7 (H)|8th|8 GB DDR4|256 GB NVMe|UHD Graphic + NVDIA QUATRO P2000|Purchased|Yathiras|12341|24-Aug-2026|MMA
44|CKCYQL3|Dell|Precision 3570|Used|i5|12th|16 GB|512 GB NVMe||Purchased|||25-Aug-2026||Stock intake 22-Aug-2026
36|7155CL3|Dell|Precision 3560|Used|i5|11th|8 GB DDR4|256 GB NVMe||Purchased||12379|27-Aug-2026
22|BZW1Y33|Dell|Latitude 5500|Used|i7|8th|8 GB|256 GB NVMe||Purchased||12357|29-Aug-2026
30|G75K433|Dell|Latitude 7400|Used|i5|8th|8 GB|256 GB NVMe||Purchased|Ihsas|12356|29-Aug-2026
40|G39KWG3|Dell|Precision 3560|Used|i7|11th|8 GB|256 GB NVMe||Purchased|Ismail|12383|31-Aug-2026
46|27K36H2|Dell|Precision 5520|Used|i7 (HQ)|7th|8 GB|256 GB NVMe||Purchased||12386|02-Sep-2026|MMA
57|5FMTM74|Dell|||i5-1334U||8 GB|||Purchased|Faizul|12412|16-Sep-2026
59|JLCYQL3|Dell|||i5-1245U||8 GB|||Purchased|athil ninthavur|12413|19-Sep-2026
35|38NGHL3|Dell|Precision 3560||i5-1145G7||16 GB|||Purchased|Suhaip|12416|22-Sep-2026
39|C80QZH3|Dell|Precision 3560||i7-1185G7||16 GB|||Purchased|||24-Sep-26
37|8ZM8Y93|Dell|Precision 3560||i7-1185G7||16 GB|||Purchased
28|7R1N633|Dell|Latitude 7400|Used|i5|8th|8 GB|256 GB NVMe||Purchased
29|8T8C1Z2|Dell|Latitude 7400|Used|i5|8th|8 GB|256 GB NVMe||Purchased
38|9255CL3|Dell|Precision 3560||i5-1145G7||16 GB|||Purchased|Sundhus IT
65|5CD5518P55|HP|15 FD|Brand New|Ultra 7|14th|8 GB DDR5|512 GB SSD||Purchased|Ds Office|No Invoice|03-Aug-2026|D
90|5CD1262H64|HP|ProBook 650 G8|Used|i7 (G)|11th|16 GB DDR4|512 GB M.2|Iris ® XE|Purchased|Zahir|No Invoice|03-Aug-2026|MMA
88|5CG0264QCW|HP|ProBook 650 G5|Used|i7|8th|8 GB DDR4|256 GB NVMe||Purchased|oshaka|12303|04-Aug-2026|MMA
80|5CG1281WP8|HP|EliteBook 850 G8|Used|i7 (G)|11th|16 GB DDR4|512 GB NVMe||Purchased|Thariq|12307|05-Aug-2026|MMA
91|5CD1262HDD|HP|ProBook 650 G8|Used|i5 (G)|11th|16 GB DDR4|512 GB NVMe||Purchased|Anshaf|12304|05-Aug-2026|MMA
85|5CG22437T8|HP|EliteBook 850 G8|Used|i7 (G)|11th|16 GB DDR4|512 GB NVMe||Purchased|Hasnath Sujan|12308|06-Aug-2026|MMA
101|1H85386MSD|HP|Victus 15-FA2082WM|Brand New|i5 (H)|13th|16 GB DDR4|512 GB NVMe|RTX 4050 (6GB)|Purchased|Ijas|12312|06-Aug-2026|D
111|5CD51052ZZ|HP|Victus 15-FA2082WM|Open Box|i5 (H)|13th|16 GB DDR4|512 GB NVMe|RTX 3050 (6GB)|Purchased|Rafa|12309|06-Aug-2026|D
79|5CG1281WP1|HP|EliteBook 850 G8|Used|i7 (G)|11th|16 GB DDR4|512 GB NVMe||Purchased|Anjana|12315|07-Aug-2026|MMA
83|5CG21078W2|HP|EliteBook 850 G8|Used|i7 (G)|11th|16 GB DDR4|512 GB NVMe||Purchased|nowsad|12316|07-Aug-2026|MMA
84|5CG2107BTK|HP|EliteBook 850 G8|Used|i7 (G)|11th|16 GB DDR4|512 GB NVMe||Purchased|SUHAIP|12314|07-Aug-2026|MMA
115|SN no|HP|Victus 15-FA2082WM|Open Box|i5 (H)|13th|16 GB DDR4|512 GB NVMe|RTX 3050 (6GB)|Purchased|Thabis|12317|07-Aug-2026|D
103|5CD505224J3|HP|Victus 15-FA2082WM|Open Box|i5 (H)|13th|16 GB DDR4|512 GB NVMe|RTX 3050 (6GB)|Purchased|||08-Aug-2026|D
61|1H85326JXV|HP|15 DS|Open Box|i7|13th|8 GB DDR4|512 GB NVMe|UHD Graphic|Purchased|Ottamavadi Khaan Sir|No Invoice|10-Aug-2026|D
64|5CD5402TQ6|HP|15 FD|Brand New|Ultra 7|14th|8 GB DDR5|512 GB SSD||Purchased|A one|No Invoice|11-Aug-2026|D
92|5CD1262HP8|HP|ProBook 650 G8|Used|i5 (G)|11th|16 GB DDR4|512 GB NVMe||Purchased|Afnan|12322|11-Aug-2026|MMA
62|5CD4325WPY|HP|15 DS|Open Box|i7|13th|8 GB DDR4|512 GB NVMe|UHD Graphic|Purchased|Usni|12326|12-Aug-2026|D
82|5CG13B4SW|HP|EliteBook 850 G8|Used|i7 (G)|11th|16 GB DDR4|512 GB NVMe||Purchased|Ahsan|12328|13-Aug-2026|MMA
99|5CD3524HNP|HP|Victus 15-FA0XXX|Used|i5 (H)|12th|16 GB DDR4|512 GB NVMe|RTX 3050 (4GB)|Purchased|Niluxshan|12328|13-Aug-2026
86|CND54505VT|HP|Hp 250R G9|Brand New|Core 5|14th|8 GB DDR5|512 GB SSD||Purchased|A one|No Invoice|15-Aug-2026|D
95|5CD1262HZM|HP|ProBook 650 G8|Used|i5 (G)|11th|16 GB DDR4|512 GB NVMe||Purchased|Nowfel Nana|12331|15-Aug-2026|MMA
110|5CD50990K7|HP|Victus 15-FA2082WM|Open Box|i5 (H)|13th|16 GB DDR4|512 GB NVMe|RTX 3050 (6GB)|Purchased|Nafthi|12330|15-Aug-2026|D
66|5CD5519HRR|HP|15 FD|Brand New|Ultra 5|14th|8 GB DDR5|512 GB SSD||Purchased|subair NTR|12332|16-Aug-2026|D
98|5CD1262H33|HP|ProBook book 650 G8|Used|i7 (G)|11th|16 GB DDR4|512 GB NVMe||Purchased|Jafna Mathursan|No Invoice|18-Aug-2026|MMA
93|5CD1262HR4|HP|ProBook 650 G8|Used|i5 (G)|11th|16 GB DDR4|512 GB NVMe||Purchased|Mauthamunai|12336|20-Aug-2026
63|5CD5177PJY|HP|15 DS|Open Box|i7|13th|8 GB DDR4|512 GB NVMe|UHD Graphic|Purchased|Aman|12343|25-Aug-2026|D
87|5CD7365QKV|HP|ProBook 450 G4|Used|i5|7th|8 GB|256 GB NVMe|HD Graphics 620|Purchased|Ihsas|12356|29-Aug-2026
104|5CD5060N63|HP|Victus 15-FA2082WM|Open Box|i5 (H)|13th|16 GB DDR4|512 GB NVMe|RTX 3050 (6GB)|Purchased|ATHEEF|12379|30-Aug-2026|D|Merged 3 duplicate log rows
97|5CD1262J6M|HP|ProBook 650 G8|Used|i5 (G)|11th|16 GB DDR4|512 GB NVMe||Purchased||12382|31-Aug-2026
100|1H85386MMV|HP|Victus 15-FA2082WM|Brand New|i5 (H)|13th|16 GB DDR4|512 GB NVMe|RTX 4050 (6GB)|Purchased|||03-Sep-2026|D
107|5CD5083ZFL|HP|Victus 15-FA2082WM|Open Box|i5 (H)|13th|16 GB DDR4|512 GB NVMe|RTX 3050 (6GB)|Purchased|||12-Sep-2026|D
112|5CD5112B9G|HP|Victus 15-FA2082WM|Open Box|i5 (H)|13th|16 GB DDR4|512 GB NVMe|RTX 3050 (6GB)|Purchased|||13-Sep-2026|D
116|1H8405008D|HP|||i5-1334U||8 GB|||Purchased|Methun||15-Sep-2026
68|1H86191789|HP|15-fd2050wm||Ultra 5||8 GB|||Purchased|Sahran||16-Sep-2026|D
70|1H86242H14|HP|15-fd2050wm||Ultra 5||8 GB|||Purchased|Sahran||16-Sep-2026|D
72|1H8625545Q|HP|15-fd2050wm||Ultra 5||8 GB|||Purchased|Agalyan|13411|16-Sep-2026|D
73|1H8625550L|HP|15-fd2050wm||Ultra 5||8 GB|||Purchased|Sahran||16-Sep-2026|D
71|1H8625538V|HP|15-fd2050wm||Ultra 5||8 GB|||Purchased|Ifathi|13412|17-Sep-2026|D
67|1H861368QY|HP|15-fd2050wm||Ultra 5||8 GB|||Purchased|Sahran||19-Sep-2026|D
69|1H86241P3T|HP|15-fd2050wm||Ultra 5||8 GB|||Purchased|Sahran||19-Sep-2026|D
74|1H862555DD|HP|15-fd2050wm||Ultra 5||8 GB|||Purchased|Sahran||19-Sep-2026|D
75|1H862556FN|HP|15-fd2050wm||Ultra 5||8 GB|||Purchased|Sahran||19-Sep-2026|D
76|1H86255FT0|HP|15-fd2050wm||Ultra 5||8 GB|||Purchased|Sahran||19-Sep-2026|D
119|5CD217496R|HP|||i7-1255U||16 GB|||Purchased|Jiffry|12416|21-Sep-2026
121|5CD3064TZQ|HP|||i5-1235U||16 GB|||Purchased|||26-Sep-26
118|5CD206HJQ6|HP|||i7-1165G7||16 GB|||Purchased|||01-Oct-26
123|5CD337MNPN|HP|||i7-1355U||16 GB|||Purchased|||05-Oct-26
117|5CD1262H86|HP|||i7-1185G7||16 GB|||Purchased
124|5CG1315DXR|HP|||i7-1165G7||16 GB|||Purchased
94|5CD1262HVB|HP|ProBook 650 G8|Used|i5 (G)|11th|16 GB DDR4|512 GB NVMe||Purchased
96|5CD1262J6J|HP|ProBook 650 G8|Used|i5 (G)|11th|16 GB DDR4|512 GB NVMe||Purchased
102|1H85463TFP|HP|Victus 15-FA2082WM|Brand New|i5 (H)|13th|16 GB DDR4|512 GB NVMe|RTX 4050 (6GB)|Purchased|MACSAR|No Invoice||D
114|5CD5353LX7|HP|Victus 15-FA2082WM|Open Box|i5 (H)|13th|16 GB DDR4|512 GB NVMe|RTX 3050 (6GB)|Purchased||||D
78|5CG14008JQ|HP|EliteBook 850 G7||i7-10610U||16 GB|||Purchased|Sundhus IT
120|5CD229DSSQ|HP|||i5-1235U||16 GB|||Purchased|Sundhus IT
77|5CG11854PF|HP|EliteBook 840 Aero G8|Used|i5|11th|16 GB DDR4|512 GB NVMe||Purchased||||MMA
81|5CG1346NLF|HP|EliteBook 850 G8|Used|i7 (G)|11th|16 GB DDR4|512 GB NVMe||Purchased
89|5CD118B16R|HP|ProBook 650 G8|Used|i5 (G)|11th|16 GB DDR4|512 GB NVMe||Purchased
105|5CD5083BJY|HP|Victus 15-FA2082WM|Open Box|i5 (H)|13th|16 GB DDR4|512 GB NVMe|RTX 3050 (6GB)|Purchased||||D
106|5CD5083C0V|HP|Victus 15-FA2082WM|Open Box|i5 (H)|13th|16 GB DDR4|512 GB NVMe|RTX 3050 (6GB)|Purchased||||D
108|5CD5098C78|HP|Victus 15-FA2082WM|Open Box|i5 (H)|13th|16 GB DDR4|512 GB NVMe|RTX 3050 (6GB)|Purchased||||D
109|5CD5098CB5|HP|Victus 15-FA2082WM|Open Box|i5 (H)|13th|16 GB DDR4|512 GB NVMe|RTX 3050 (6GB)|Purchased||||D
113|5CD5353LRB|HP|Victus 15-FA2082WM|Open Box|i5 (H)|13th|16 GB DDR4|512 GB NVMe|RTX 3050 (6GB)|Purchased||||D
129||Lenovo|ThinkPad|Used|i5|10th|8 GB|256 GB NVMe||Purchased|ROHI|No Invoice|03-Aug-2026|MMA|CHECK: Serial number missing
134|R9108BGT|Lenovo|ThinkPad|Used|i5|10th|8 GB|256 GB NVMe||Purchased|Lucky HR|No Invoice|03-Aug-2026|MMA|Board No: W1KS0BB119N
135|R911N0GC|Lenovo|ThinkPad|Used|i5|10th|8 GB|256 GB NVMe||Purchased|Lucky HR|No Invoice|03-Aug-2026|MMA|Board No: W1KS12N12A2
131|PW02WARL|Lenovo|ThinkPad|Used|i5|11th|8 GB|256 GB NVMe||Purchased|SUHAIV|12329|15-Aug-2026||Board No: W2CG26M0JJ0
130|PW02VY22|Lenovo|ThinkPad|Used|i5|11th|8 GB|256 GB SSD||Purchased|aasik|12342|24-Aug-26||CHECK: Date unclear in source: "24/2026"
127|PF5GHBGT|Lenovo|IdeaPad slim 3|Brand New|i5 (H)|13th|8 GB|512 GB SSD||Purchased|Nuha|12375|27-Aug-2026|D
125|PF4RBV4W|Lenovo|IdeaPad slim 3|Used|i5 (H)|13th|16 GB|512 GB SSD||Purchased|ASLOON|12358|30-Aug-2026
128|R90LDAUQ|Lenovo|Lenovo V110|Used|i5|6th|8 GB|256 GB|2GB AMD Readon|Purchased|Aakil|12381|31-Aug-2026
137|DX003CPF|Lenovo|V15 G5 IRL|Brand New|i5 (H)|13th|8 GB|512 GB SSD||Purchased|Thanoj||15-Sep-2026|D
133|R90XN720|Lenovo|ThinkPad||i5-8365U||8 GB|||Purchased
132|PW02WQ4F|Lenovo|ThinkPad|Used|i5|11th|8 GB|256 GB NVMe||Purchased||No Invoice|||Board No: W2CG26M0JP7
136|W1KS03S11YG|Lenovo|ThinkPad||i5-8365U||8 GB|||Purchased|Lucky Hr
126|PF5GEYNF|Lenovo|IdeaPad slim 3|Brand New|i5 (H)|13th|8 GB|512 GB SSD||Purchased||||D
147|0B33XHH23373GP|Microsoft|Surface Go 3|Used|||16 GB|256 GB|Iris ® XE|Purchased|Ilham|12327|12-Aug-2026|MMA
148|0B344QM23373GP|Microsoft|Surface Go 3|Used|i5|12th|16 GB|256 GB NVMe|Iris ® XE|Purchased
144|K2601N0046053|MSI|Cyborg 15|Brand New|i5 (H)|13th|16 GB DDR5|512 GB NVMe|RTX 4050 (6GB)|Purchased|shop Nnithavur||26-Sep-26|D
142|K2601N0045869|MSI|Cyborg 15|Brand New|i5 (H)|13th|16 GB DDR5|512 GB NVMe|RTX 4050 (6GB)|Purchased|Batticoloa|12319|08-Aug-2026|D
139|K2601N0045848|MSI|Cyborg 15|Brand New|i5 (H)|13th|16 GB DDR5|512 GB NVMe|RTX 4050 (6GB)|Purchased|Saman Kumara|12325|12-Aug-2026|D
145|K2601N0046065|MSI|Cyborg 15|Brand New|i5 (H)|13th|16 GB DDR5|512 GB NVMe|RTX 4050 (6GB)|Purchased|aruhap||31-Aug-2026|D|Merged 2 duplicate log rows
146|K2501N0124982|MSI|Msi Thin|Used|i5|12th|16 GB|512 GB NVMe|RTX 2050 4GB|Purchased|Sakaan|12380|31-Aug-2026
138|K2601N0045799|MSI|Cyborg 15|Brand New|i5 (H)|13th|16 GB DDR5|512 GB NVMe|RTX 4050 (6GB)|Purchased|Raaith||14-Sep-2026|D
141|K2601N0045860|MSI|Cyborg 15|Brand New|i5 (H)|13th|16 GB DDR5|512 GB NVMe|RTX 4050 (6GB)|Purchased|Sahran||16-Sep-2026|D
143|K2601N0046035|MSI|Cyborg 15|Brand New|i5 (H)|13th|16 GB DDR5|512 GB NVMe|RTX 4050 (6GB)|Purchased|Sahran||16-Sep-2026|D
47|27K36HR|Dell|Precision 5520|Used|i7 (HQ)|7th|8 GB|256 GB NVMe||Returned|||09-Aug-2026
21|BJDWM13|Dell|Latitude 5500|Used|i7 (H)|8th|8 GB DDR4|256 GB NVMe||Returned||||MMA
25|3NQR4Y3|Dell|Latitude 5540|Used|i7|13th|8 GB DDR5|256 GB SSD||Returned|||||Stock intake 22-Aug-2026; Merged 2 duplicate log rows
51|OG8ZXT2|Dell|Precision 5530|Used|i7 (H)|8th|8 GB DDR4|256 GB NVMe|UHD Graphic + NVDIA QUATRO P2000|Returned||||MMA
52|B4XWL13|Dell|Precision 5540|Used|i7 (H)|9th|8 GB|256 GB NVMe|UHD Graphic + NVDIA QUATRO P1000|Returned||||MMA
60|1H85266JG1|HP|15 DS|Open Box|i7|13th|8 GB DDR4|512 GB NVMe|UHD Graphic|Shop Usage|Aruhap||25-Aug-2026|D`;
