/* CSS used by "Download invoice file" so the saved invoice looks identical */
const INVCSS=`body{margin:0;background:#fff}
.shs{overflow-x:auto;padding:4px}
.sheet{position:relative;width:210mm;min-height:297mm;margin:auto;background:#fff;color:#2b2b2b;padding:14mm 14mm 40mm 30mm;font:12px/1.4 Cambria,Georgia,serif;box-shadow:0 2px 20px rgba(0,0,0,.25);box-sizing:border-box;text-align:left}
.sheet .vt{position:absolute;left:9mm;top:28mm;writing-mode:vertical-rl;transform:rotate(180deg);font:300 46px "Century Gothic","Trebuchet MS",sans-serif;color:#444}
.sheet .slogo{position:absolute;right:12mm;top:9mm;width:27mm;height:27mm;border-radius:50%}
.sheet h1{margin:6mm 0 0;font:300 25px "Century Gothic","Trebuchet MS",sans-serif;color:#f2564f}
.sheet .sub{font-size:12px;margin-bottom:5mm}.sheet hr{border:0;border-top:1px solid #f2564f;margin:0 0 4mm;opacity:.7}
.sheet .g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6mm;font-size:11.5px;min-height:20mm}
.sheet .lb{display:block;color:#f2564f;font:13px "Century Gothic","Trebuchet MS",sans-serif;margin-bottom:2mm}
.sheet .ph{border-top:1px solid #bbb;padding-top:1.5mm;font-size:12px;margin-bottom:3mm;min-height:7mm}
.sheet table.it{width:100%;border-collapse:collapse}
.sheet table.it th{background:#f2564f;color:#fff;font:bold 12px "Century Gothic","Trebuchet MS",sans-serif;padding:5px 8px;text-align:left;position:static}
.sheet table.it td{padding:3px 8px;border-bottom:1px solid #b5a99c;vertical-align:top;white-space:normal;font-size:11.5px;height:19px}
.sheet .pn{font:14px Arial,sans-serif;color:#000}.sheet mark{background:#ff0}
.sheet .r{text-align:right}.sheet .tt td{border-bottom:1px solid #b5a99c;padding:4px 8px;height:auto}
.sheet .thx{text-align:right;color:#f2564f;font:14px "Century Gothic","Trebuchet MS",sans-serif;margin:7mm 5mm}
.sheet .ft{position:absolute;left:30mm;right:14mm;bottom:11mm;display:grid;grid-template-columns:1fr 1fr;gap:4mm;font-size:11px;color:#777}.sheet .ft b{color:#f2564f;font-weight:400}
@page{size:A4;margin:0}
.sheetwrap{margin:0!important;padding:0!important;border:0!important;box-shadow:none!important;background:#fff!important;border-radius:0!important}.sheetwrap .row{display:none}
.shs{overflow:visible;padding:0}.sheet{box-shadow:none;margin:0;width:210mm;height:297mm;min-height:0}.shell{display:block}}`;
