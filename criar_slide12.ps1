Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap(1920,1080)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode='AntiAlias'; $g.TextRenderingHint='AntiAliasGridFit'
$g.Clear([System.Drawing.Color]::FromArgb(245,248,252))
$navy=New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(20,47,73))
$teal=New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(15,119,132))
$pale=New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(225,239,246))
$white=[System.Drawing.Brushes]::White
$title=New-Object System.Drawing.Font('Segoe UI',39,[System.Drawing.FontStyle]::Bold)
$sub=New-Object System.Drawing.Font('Segoe UI',23)
$body=New-Object System.Drawing.Font('Segoe UI',26,[System.Drawing.FontStyle]::Bold)
$num=New-Object System.Drawing.Font('Segoe UI',22,[System.Drawing.FontStyle]::Bold)
$fmt=New-Object System.Drawing.StringFormat
$fmt.Alignment='Center';$fmt.LineAlignment='Center'
$g.DrawString('Exemplo de clonagem terapêutica',$title,$navy,70,40)
$g.DrawString('Exemplo hipotético: produção de células cardíacas para pesquisa.',$sub,$navy,74,116)
$labels=@('Célula da pele do paciente','Núcleo transferido para um óvulo sem núcleo','Ativação e divisões celulares','Formação do blastocisto','Obtenção e cultivo de células-tronco embrionárias','Diferenciação em células do músculo cardíaco')
$positions=@(@(70,220),@(700,220),@(1330,220),@(1330,510),@(700,510),@(70,510))
for($i=0;$i -lt 6;$i++){
 $x=$positions[$i][0];$y=$positions[$i][1]
 $g.FillRectangle($pale,$x,$y,520,210)
 $g.FillEllipse($teal,($x+22),($y+18),52,52)
 $r=New-Object System.Drawing.RectangleF(($x+22),($y+18),52,52)
 $g.DrawString([string]($i+1),$num,$white,$r,$fmt)
 $r=New-Object System.Drawing.RectangleF(($x+18),($y+76),484,115)
 $g.DrawString($labels[$i],$body,$navy,$r,$fmt)
}
$pen=New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(15,119,132),6)
$pen.CustomEndCap=New-Object System.Drawing.Drawing2D.AdjustableArrowCap(6,7)
$g.DrawLine($pen,610,325,680,325);$g.DrawLine($pen,1240,325,1310,325)
$g.DrawLine($pen,1590,446,1590,494)
$g.DrawLine($pen,1310,615,1240,615);$g.DrawLine($pen,680,615,610,615)
$r=New-Object System.Drawing.RectangleF(100,765,1720,95)
$g.DrawString('As células podem ser estudadas para compreender doenças e desenvolver possíveis estratégias de reparação.',$sub,$navy,$r,$fmt)
$g.FillRectangle($navy,70,900,1780,115)
$r=New-Object System.Drawing.RectangleF(100,910,1720,95)
$g.DrawString('Esse processo não produz diretamente um coração completo e pronto para transplante.',$body,$white,$r,$fmt)
$bmp.Save((Join-Path $PSScriptRoot 'tabelas-canva/slide12-clonagem-terapeutica.png'),[System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose();$bmp.Dispose()

