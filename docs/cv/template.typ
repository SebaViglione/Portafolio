// Template del CV publicado en sebaviglione.com
// Estilo basado en all resumes/backend/CV_Sebastian_Viglione_Backend_ES.pdf
// Sin teléfono a propósito: este CV es de descarga pública.

#let navy = rgb("#1B3A6B")
#let steel = rgb("#8FAADC")
#let label-blue = rgb("#9DB2D6")
#let side-text = rgb("#EDF1F8")
#let body-color = rgb("#222222")
#let slate = rgb("#5A6B85")
#let rule-light = rgb(255, 255, 255, 70)
#let rule-main = rgb("#9FB0C9")

#let sideheading(t) = {
  v(15pt)
  text(fill: white, weight: "bold", size: 8.5pt, tracking: 1.3pt, upper(t))
  v(-3pt)
  line(length: 100%, stroke: 0.7pt + rule-light)
  v(2pt)
}

#let sublabel(t) = {
  text(fill: label-blue, size: 6.5pt, tracking: 1pt, weight: "medium", upper(t))
}

#let contactrow(label, value) = {
  sublabel(label)
  v(-6pt)
  text(fill: side-text, size: 8pt, value)
  v(1pt)
}

#let mainheading(t) = {
  v(20pt, weak: true)
  text(fill: navy, weight: "bold", size: 10.5pt, tracking: 1.6pt, upper(t))
  v(-4pt)
  line(length: 100%, stroke: 0.9pt + rule-main)
  v(6pt)
}

#let pill(t) = box(
  stroke: 0.6pt + rgb("#C3CDDE"),
  fill: rgb("#F3F6FA"),
  radius: 2.5pt,
  inset: (x: 5pt, y: 3pt),
  text(fill: rgb("#33507E"), size: 7pt, weight: "medium", t),
)

#let pillrow(tags) = {
  set par(leading: 0.9em)
  for (i, t) in tags.enumerate() {
    if i > 0 { h(4pt) }
    pill(t)
  }
}

#let entryhead(title, date) = {
  grid(
    columns: (1fr, auto),
    column-gutter: 12pt,
    text(fill: navy, weight: "bold", size: 9.5pt, title),
    align(right + horizon, text(fill: slate, size: 8pt, date)),
  )
  v(1pt)
}

#let cv(data) = {
  set page(
    paper: "a4",
    margin: 0pt,
    background: place(left + top, rect(width: 187pt, height: 100%, fill: navy)),
  )
  set text(font: "Liberation Sans", size: 9pt, fill: body-color, lang: data.lang, hyphenate: false)
  set par(justify: true, leading: 0.66em)
  set list(marker: text(fill: rgb("#555555"), size: 8pt, "•"), indent: 1pt, body-indent: 5pt)

  grid(
    columns: (187pt, 1fr),
    // ── SIDEBAR ──
    block(inset: (x: 21pt, top: 28pt, bottom: 20pt), width: 100%)[
      #set text(fill: side-text, size: 8pt)
      #set par(justify: false, leading: 0.5em)

      #text(fill: white, weight: "bold", size: 17.5pt)[#data.name]
      #v(2pt)
      #text(fill: steel, weight: "bold", size: 9pt)[#data.subtitle]

      #sideheading(data.labels.contact)
      #for pair in data.contact [ #contactrow(pair.at(0), pair.at(1)) ]

      #sideheading(data.labels.education)
      #for e in data.education [
        #text(fill: white, weight: "bold", size: 8.5pt)[#e.title]
        #v(-6pt)
        #text(fill: label-blue, size: 8pt)[#e.detail]
        #v(2pt)
      ]

      #sideheading(data.labels.skills)
      #for pair in data.skills [
        #text(fill: white, weight: "bold", size: 8pt)[#pair.at(0):]
        #text(fill: side-text, size: 8pt)[ #pair.at(1)]
        #v(-2pt)
      ]

      #sideheading(data.labels.languages)
      #for pair in data.languages [
        #text(fill: white, weight: "bold", size: 8pt)[#pair.at(0):]
        #text(fill: side-text, size: 8pt)[ #pair.at(1)]
        #v(-2pt)
      ]

      #sideheading(data.labels.soft)
      #for (i, c) in data.soft.enumerate() [
        #text(fill: side-text, size: 8pt)[#c]
        #if i < data.soft.len() - 1 [
          #v(-2pt)
          #line(length: 100%, stroke: 0.4pt + rgb(255, 255, 255, 40))
          #v(-2pt)
        ]
      ]
    ],
    // ── MAIN ──
    block(inset: (left: 30pt, right: 26pt, top: 32pt, bottom: 26pt), width: 100%)[
      #mainheading(data.labels.profile)
      #data.profile

      #mainheading(data.labels.experience)
      #entryhead(data.experience.title, data.experience.period)
      #v(2pt)
      #list(..data.experience.bullets)

      #mainheading(data.labels.projects)
      #for (i, p) in data.projects.enumerate() [
        #if i > 0 [ #v(13pt) ]
        #text(fill: navy, weight: "bold", size: 9.5pt)[#p.title]
        #v(-4pt)
        #pillrow(p.tags)
        #v(-2pt)
        #list(..p.bullets)
      ]
    ],
  )
}
