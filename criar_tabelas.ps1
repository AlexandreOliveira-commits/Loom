Add-Type -AssemblyName System.Drawing
$outDir = Join-Path $PSScriptRoot 'tabelas-canva'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
function Make-Table($filename, $title, $headers, $rows, $widths, $rowHeight) {
  $w = 1800; $top = 160; $headH = 90; $h = $top + $headH + $rows.Count * $rowHeight + 60
  $bmp = New-Object System.Drawing.Bitmap($w,$h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'; $g.TextRenderingHint = 'AntiAliasGridFit'
  $g.Clear([System.Drawing.Color]::FromArgb(245,248,252))
  $navy = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(20,47,73))
  $ink = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(30,48,65))
  $white = [System.Drawing.Brushes]::White
  $titleFont = New-Object System.Drawing.Font('Segoe UI',38,[System.Drawing.FontStyle]::Bold)
  $headFont = New-Object System.Drawing.Font('Segoe UI',25,[System.Drawing.FontStyle]::Bold)
  $bodyFont = New-Object System.Drawing.Font('Segoe UI',24)
  $g.DrawString($title,$titleFont,$navy,48,45)
  $fmt = New-Object System.Drawing.StringFormat
  $fmt.LineAlignment = [System.Drawing.StringAlignment]::Center
  $x = 45
  for($c=0;$c -lt $headers.Count;$c++) {
    $g.FillRectangle($navy,$x,$top,$widths[$c],$headH)
    $rect = New-Object System.Drawing.RectangleF(($x+22),$top,($widths[$c]-44),$headH)
    $g.DrawString($headers[$c],$headFont,$white,$rect,$fmt)
    $x += $widths[$c]
  }
  for($r=0;$r -lt $rows.Count;$r++) {
    $y=$top+$headH+$r*$rowHeight; $x=45
    if($r%2 -eq 0){$color=[System.Drawing.Color]::White}else{$color=[System.Drawing.Color]::FromArgb(229,239,246)}
    $brush = New-Object System.Drawing.SolidBrush($color)
    for($c=0;$c -lt $headers.Count;$c++) {
      $g.FillRectangle($brush,$x,$y,$widths[$c],$rowHeight)
      $rect=New-Object System.Drawing.RectangleF(($x+22),($y+10),($widths[$c]-44),($rowHeight-20))
      $g.DrawString($rows[$r][$c],$bodyFont,$ink,$rect,$fmt)
      $x += $widths[$c]
    }
    $brush.Dispose()
  }
  $bmp.Save((Join-Path $outDir $filename),[System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose();$bmp.Dispose()
}
Make-Table 'tipos-celulas-tronco.png' 'Tipos de células-tronco' @('Tipo','Capacidade de diferenciação','Exemplo') @(
  ,@('Totipotentes','Originam todos os tipos celulares do organismo e tecidos extraembrionários, como os da placenta.','Zigoto e células das primeiras divisões embrionárias.')
  ,@('Pluripotentes','Originam praticamente todos os tipos celulares do corpo.','Células-tronco embrionárias e células iPS.')
  ,@('Multipotentes','Originam diferentes células de uma mesma linhagem ou conjunto de tecidos.','Células-tronco hematopoiéticas.')
  ,@('Unipotentes','Originam um tipo celular específico, mantendo a autorrenovação.','Algumas populações de células-tronco da pele.')
) @(300,800,610) 190
Make-Table 'sinais-quimicos.png' 'Exemplos de sinais químicos' @('Sinal','Função principal') @(
  ,@('Eritropoietina (EPO)','Produzida principalmente pelos rins, estimula precursores da linhagem vermelha a produzir hemácias.')
  ,@('Trombopoietina (TPO)','Produzida principalmente pelo fígado, participa da manutenção das células-tronco hematopoiéticas e da formação dos megacariócitos, que produzem plaquetas.')
  ,@('G-CSF','Estimula principalmente a produção de neutrófilos e pode mobilizar células-tronco hematopoiéticas para o sangue.')
  ,@('Interleucinas','Grupo de proteínas com diferentes funções na comunicação, multiplicação e diferenciação de células do sistema imunológico.')
) @(420,1290) 200
Make-Table 'clonagem-terapeutica-reprodutiva.png' 'Clonagem terapêutica × reprodutiva' @('Clonagem terapêutica','Clonagem reprodutiva') @(
  ,@('Busca obter células-tronco para pesquisa e possíveis terapias.','Busca gerar um novo indivíduo.')
  ,@('O embrião não é transferido para um útero.','Envolve a transferência do embrião para um útero.')
  ,@('Tem como foco estudar doenças e produzir células especializadas.','Tem como finalidade o nascimento de um organismo.')
) @(855,855) 170
