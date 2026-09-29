Add-Type -AssemblyName System.Drawing

$outDir = Join-Path $PSScriptRoot '..\src\static\icons'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$icons = @('search','bell','home','book','school','bag','person','cart','order','pin','calendar','check','camera','message','settings','arrow','truck','gift','users','medal','clock','download','play','grid','shield','headset')

function New-Pen($color, $width = 6) {
  $pen = New-Object System.Drawing.Pen($color, $width)
  $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
  return $pen
}

function Draw-RoundedRect($g, $pen, $x, $y, $w, $h, $r) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $r * 2
  $path.AddArc($x,$y,$d,$d,180,90); $path.AddArc($x+$w-$d,$y,$d,$d,270,90)
  $path.AddArc($x+$w-$d,$y+$h-$d,$d,$d,0,90); $path.AddArc($x,$y+$h-$d,$d,$d,90,90)
  $path.CloseFigure(); $g.DrawPath($pen,$path); $path.Dispose()
}

function Draw-Icon($g, $name, $pen, $brush) {
  switch ($name) {
    'search' { $g.DrawEllipse($pen,16,14,46,46); $g.DrawLine($pen,59,58,80,79) }
    'bell' { $g.DrawArc($pen,25,17,46,52,190,160); $g.DrawLine($pen,25,43,20,68); $g.DrawLine($pen,20,68,76,68); $g.DrawLine($pen,76,68,71,43); $g.DrawArc($pen,40,67,16,13,0,180); $g.DrawLine($pen,48,10,48,17) }
    'home' { $g.DrawLines($pen,[System.Drawing.Point[]]@((New-Object Drawing.Point(14,45)),(New-Object Drawing.Point(48,16)),(New-Object Drawing.Point(82,45)))); $g.DrawLines($pen,[System.Drawing.Point[]]@((New-Object Drawing.Point(22,40)),(New-Object Drawing.Point(22,80)),(New-Object Drawing.Point(74,80)),(New-Object Drawing.Point(74,40)))); $g.DrawRectangle($pen,40,56,16,24) }
    'book' { $g.DrawArc($pen,10,18,38,62,80,190); $g.DrawArc($pen,48,18,38,62,-90,190); $g.DrawLine($pen,48,23,48,80); $g.DrawLine($pen,20,31,38,34); $g.DrawLine($pen,58,34,76,31); $g.DrawLine($pen,20,48,38,51); $g.DrawLine($pen,58,51,76,48) }
    'school' { $g.DrawPolygon($pen,[System.Drawing.Point[]]@((New-Object Drawing.Point(12,34)),(New-Object Drawing.Point(48,15)),(New-Object Drawing.Point(84,34)))); $g.DrawLine($pen,20,38,20,73); $g.DrawLine($pen,76,38,76,73); $g.DrawLine($pen,12,78,84,78); $g.DrawLine($pen,33,39,33,70); $g.DrawLine($pen,48,39,48,70); $g.DrawLine($pen,63,39,63,70) }
    'bag' { Draw-RoundedRect $g $pen 16 28 64 54 8; $g.DrawArc($pen,34,13,28,28,180,180); $g.DrawLine($pen,31,42,31,48); $g.DrawLine($pen,65,42,65,48) }
    'person' { $g.DrawEllipse($pen,34,13,28,28); $g.DrawArc($pen,19,48,58,39,185,170) }
    'cart' { $g.DrawLine($pen,12,18,22,18); $g.DrawLines($pen,[System.Drawing.Point[]]@((New-Object Drawing.Point(22,18)),(New-Object Drawing.Point(29,62)),(New-Object Drawing.Point(75,62)),(New-Object Drawing.Point(83,31)),(New-Object Drawing.Point(27,31)))); $g.DrawEllipse($pen,29,71,10,10); $g.DrawEllipse($pen,67,71,10,10) }
    'order' { Draw-RoundedRect $g $pen 22 12 52 72 7; $g.DrawLine($pen,34,31,62,31); $g.DrawLine($pen,34,45,62,45); $g.DrawLine($pen,34,59,55,59) }
    'pin' { $g.DrawEllipse($pen,26,12,44,44); $g.DrawEllipse($pen,40,26,16,16); $g.DrawLines($pen,[System.Drawing.Point[]]@((New-Object Drawing.Point(28,46)),(New-Object Drawing.Point(48,82)),(New-Object Drawing.Point(68,46)))) }
    'calendar' { Draw-RoundedRect $g $pen 14 20 68 62 8; $g.DrawLine($pen,15,38,81,38); $g.DrawLine($pen,31,11,31,28); $g.DrawLine($pen,65,11,65,28); $g.FillEllipse($brush,28,50,8,8); $g.FillEllipse($brush,44,50,8,8); $g.FillEllipse($brush,60,50,8,8); $g.FillEllipse($brush,28,66,8,8); $g.FillEllipse($brush,44,66,8,8) }
    'check' { $g.DrawEllipse($pen,13,13,70,70); $g.DrawLines($pen,[System.Drawing.Point[]]@((New-Object Drawing.Point(29,49)),(New-Object Drawing.Point(43,63)),(New-Object Drawing.Point(69,35)))) }
    'camera' { Draw-RoundedRect $g $pen 12 27 72 54 9; $g.DrawEllipse($pen,35,40,26,26); $g.DrawLines($pen,[System.Drawing.Point[]]@((New-Object Drawing.Point(30,27)),(New-Object Drawing.Point(37,17)),(New-Object Drawing.Point(59,17)),(New-Object Drawing.Point(66,27)))); $g.FillEllipse($brush,70,37,6,6) }
    'message' { Draw-RoundedRect $g $pen 12 17 72 55 10; $g.DrawLines($pen,[System.Drawing.Point[]]@((New-Object Drawing.Point(28,72)),(New-Object Drawing.Point(22,83)),(New-Object Drawing.Point(46,72)))); $g.DrawLine($pen,28,37,68,37); $g.DrawLine($pen,28,52,58,52) }
    'settings' { $g.DrawEllipse($pen,23,23,50,50); $g.DrawEllipse($pen,39,39,18,18); foreach($a in 0,45,90,135){$rad=$a*[Math]::PI/180;$x1=48+[Math]::Cos($rad)*27;$y1=48+[Math]::Sin($rad)*27;$x2=48+[Math]::Cos($rad)*38;$y2=48+[Math]::Sin($rad)*38;$g.DrawLine($pen,$x1,$y1,$x2,$y2);$g.DrawLine($pen,96-$x1,96-$y1,96-$x2,96-$y2)} }
    'arrow' { $g.DrawLines($pen,[System.Drawing.Point[]]@((New-Object Drawing.Point(35,20)),(New-Object Drawing.Point(63,48)),(New-Object Drawing.Point(35,76)))) }
    'truck' { Draw-RoundedRect $g $pen 8 25 49 41 5; $g.DrawLines($pen,[System.Drawing.Point[]]@((New-Object Drawing.Point(57,37)),(New-Object Drawing.Point(74,37)),(New-Object Drawing.Point(86,51)),(New-Object Drawing.Point(86,66)),(New-Object Drawing.Point(57,66)))); $g.DrawEllipse($pen,19,62,15,15); $g.DrawEllipse($pen,67,62,15,15) }
    'gift' { $g.DrawRectangle($pen,15,38,66,43); $g.DrawRectangle($pen,10,27,76,14); $g.DrawLine($pen,48,28,48,81); $g.DrawArc($pen,22,9,26,22,190,170); $g.DrawArc($pen,48,9,26,22,180,170) }
    'users' { $g.DrawEllipse($pen,36,13,24,24); $g.DrawArc($pen,24,43,48,36,190,160); $g.DrawEllipse($pen,12,25,18,18); $g.DrawArc($pen,5,48,29,27,190,145); $g.DrawEllipse($pen,66,25,18,18); $g.DrawArc($pen,62,48,29,27,205,145) }
    'medal' { $g.DrawEllipse($pen,23,12,50,50); $g.DrawPolygon($pen,[System.Drawing.Point[]]@((New-Object Drawing.Point(48,23)),(New-Object Drawing.Point(54,38)),(New-Object Drawing.Point(70,39)),(New-Object Drawing.Point(58,49)),(New-Object Drawing.Point(62,64)),(New-Object Drawing.Point(48,55)),(New-Object Drawing.Point(34,64)),(New-Object Drawing.Point(38,49)),(New-Object Drawing.Point(26,39)),(New-Object Drawing.Point(42,38)))); $g.DrawLine($pen,34,60,27,85); $g.DrawLine($pen,62,60,69,85) }
    'clock' { $g.DrawEllipse($pen,12,12,72,72); $g.DrawLine($pen,48,27,48,50); $g.DrawLine($pen,48,50,64,60) }
    'download' { $g.DrawLine($pen,48,12,48,61); $g.DrawLines($pen,[System.Drawing.Point[]]@((New-Object Drawing.Point(29,45)),(New-Object Drawing.Point(48,64)),(New-Object Drawing.Point(67,45)))); $g.DrawLines($pen,[System.Drawing.Point[]]@((New-Object Drawing.Point(18,67)),(New-Object Drawing.Point(18,82)),(New-Object Drawing.Point(78,82)),(New-Object Drawing.Point(78,67)))) }
    'play' { $g.DrawEllipse($pen,12,12,72,72); $g.DrawPolygon($pen,[System.Drawing.Point[]]@((New-Object Drawing.Point(40,31)),(New-Object Drawing.Point(67,48)),(New-Object Drawing.Point(40,65)))) }
    'grid' { foreach($x in 15,53){foreach($y in 15,53){Draw-RoundedRect $g $pen $x $y 28 28 5}} }
    'shield' { $g.DrawLines($pen,[System.Drawing.Point[]]@((New-Object Drawing.Point(48,10)),(New-Object Drawing.Point(78,23)),(New-Object Drawing.Point(74,60)),(New-Object Drawing.Point(48,84)),(New-Object Drawing.Point(22,60)),(New-Object Drawing.Point(18,23)),(New-Object Drawing.Point(48,10)))); $g.DrawLines($pen,[System.Drawing.Point[]]@((New-Object Drawing.Point(33,46)),(New-Object Drawing.Point(44,57)),(New-Object Drawing.Point(65,35)))) }
    'headset' { $g.DrawArc($pen,14,13,68,68,190,160); Draw-RoundedRect $g $pen 11 45 17 28 6; Draw-RoundedRect $g $pen 68 45 17 28 6; $g.DrawArc($pen,48,61,27,20,0,90) }
  }
}

foreach ($name in $icons) {
  $bitmap = [System.Drawing.Bitmap]::new(96,96,[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bitmap)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.Clear([System.Drawing.Color]::Transparent)
  $color = [System.Drawing.Color]::FromArgb(255,14,54,157)
  $pen = New-Pen $color 5.5
  $brush = New-Object System.Drawing.SolidBrush $color
  Draw-Icon $g $name $pen $brush
  $bitmap.Save((Join-Path $outDir "$name.png"),[System.Drawing.Imaging.ImageFormat]::Png)
  $brush.Dispose(); $pen.Dispose(); $g.Dispose(); $bitmap.Dispose()
}

$logo = [System.Drawing.Bitmap]::new(128,128,[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$lg = [System.Drawing.Graphics]::FromImage($logo); $lg.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias; $lg.Clear([System.Drawing.Color]::Transparent)
$logoPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$logoPath.AddArc(4,4,28,28,180,90); $logoPath.AddArc(96,4,28,28,270,90); $logoPath.AddArc(96,96,28,28,0,90); $logoPath.AddArc(4,96,28,28,90,90); $logoPath.CloseFigure()
$blue = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255,38,104,237)); $lg.FillPath($blue,$logoPath)
$white = New-Pen ([System.Drawing.Color]::White) 7
$lg.DrawPolygon($white,[System.Drawing.Point[]]@((New-Object Drawing.Point(23,53)),(New-Object Drawing.Point(64,31)),(New-Object Drawing.Point(105,53)),(New-Object Drawing.Point(64,75))))
$lg.DrawArc($white,39,59,50,37,0,180); $lg.DrawLine($white,39,75,39,84); $lg.DrawLine($white,89,75,89,84); $lg.DrawLine($white,104,54,104,83); $lg.FillEllipse([System.Drawing.Brushes]::White,100,82,8,8)
$logo.Save((Join-Path $outDir 'brand-logo.png'),[System.Drawing.Imaging.ImageFormat]::Png)
$white.Dispose(); $blue.Dispose(); $logoPath.Dispose(); $lg.Dispose(); $logo.Dispose()
