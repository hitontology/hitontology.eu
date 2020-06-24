---
layout: page
title: Publications
order: 31
---
<!-- use css for superduper collapsibles -->
<link rel="stylesheet" href="{{site.url}}{{ site.baseurl }}/public/css/colaps.css">
## Publications

## Posters
<figure>
<center>
<a href="{{site.url}}{{site.baseurl}}/public/gmds-2019-poster-vd.svg">
<img src="{{site.url}}{{site.baseurl}}/public/gmds-2019-poster-vd-400.png" alt="Developing and implementing a health IT ontology for facilitating retrieval of health IT evaluation studies"/>
</a>
</center>
<figcaption>
Developing and implementing a health IT ontology for facilitating retrieval of health IT evaluation studies.<br>
Verena Dornauer, Maryam Ghalandari, Konrad Höffner, Franziska Jahn, Alfred Winter, Elske Ammenwerth.
GMDS 2019, Dortmund.
</figcaption>
</figure>

<div class="wrap-collabsible">
  <input id="collapsible1" class="toggle" type="checkbox">
  <label for="collapsible1" class="lbl-toggle">Open BibTeX</label>
  <div class="collapsible-content">
    <div class="content-inner">
      <p>
      @INPROCEEDINGS {hitomethods1,<br>
          author    = "Verena Dornauer, Maryam Ghalandari, Konrad Höffner, Franziska Jahn, Alfred Winter, Elske Ammenwerth",<br>
          title     = "Developing and implementing a health {IT} ontology for facilitating retrieval of health {IT} evaluation studies",<br>
          booktitle = "64. Jahrestagung der Deutschen Gesellschaft für Medizinische Informatik, Biometrie und Epidemiologie e. V. (GMDS)",<br>
          year      = "2019"}
      </p>
    </div>
  </div>
</div>

<figure>
<center>
<a href="{{site.url}}{{site.baseurl}}/public/icimth-2019-poster-vd.svg">
<img src="{{site.url}}{{site.baseurl}}/public/icimth-2019-poster-vd-400.png" alt="Challenges and solutions while developing HITO&ndash;a Health IT Ontology"/>
</a>
</center>
<figcaption>
Challenges and solutions while developing HITO&ndash;a Health IT Ontology.<br>
Verena Dornauer, Maryam Ghalandari, Konrad Höffner, Franziska Jahn, Birgit Schneider, Alfred Winter, Elske Ammenwerth.
ICIMTH 2019, Athens. Best Poster Award.
</figcaption>
</figure>

<div class="wrap-collabsible">
  <input id="collapsible2" class="toggle" type="checkbox">
  <label for="collapsible2" class="lbl-toggle">Open BibTeX</label>
  <div class="collapsible-content">
    <div class="content-inner">
      <p>
      @INPROCEEDINGS {hitomethods2,<br>
          author    = "Verena Dornauer, Maryam Ghalandari, Konrad Höffner, Franziska Jahn, Birgit Schneider, Alfred Winter, Elske Ammenwerth",<br>
          title     = "Challenges and solutions while developing {HITO}–a {H}ealth {IT} {O}ntology",<br>
          booktitle = "International Conference on Informatics, Management, and Technology in Healthcare",<br>
          year      = "2019"}
      </p>
    </div>
  </div>
</div>

<figure>
<center>
<a href="{{site.url}}{{site.baseurl}}/public/medinfo-2019-poster-ea.svg">
<img src="{{site.url}}{{site.baseurl}}/public/medinfo-2019-poster-ea-400.png" alt="An Ontology for Describing Health IT Interventions: Methodological Considerations"/>
</a>
</center>
<figcaption>
An Ontology for Describing Health IT Interventions: Methodological Considerations.<br>
Elske Ammenwerth, Verena Dornauer, Maryam Ghalandari, Franziska Jahn, Nicolet de Keizer, Alfred Winter.<br>
Proceedings of Medinfo 2019, the 17th World Congress on Medical and Health Informatics, 25.-30.8.2019, Lyon.<br>
Amsterdam: IOS Press. pp. 1419-20.
</figcaption>
</figure>

<div class="wrap-collabsible">
  <input id="collapsible3" class="toggle" type="checkbox">
  <label for="collapsible3" class="lbl-toggle">Open BibTeX</label>
  <div class="collapsible-content">
    <div class="content-inner">
      <p>
      @INPROCEEDINGS {hitomethods3,<br>
        title={An Ontology for Describing Health {IT} Interventions: {M}ethodological Considerations},<br>
        author={Ammenwerth, Elske and Dornauer, Verena and Ghalandari, Maryam and Jahn, Franziska and Winter, Alfred},<br>
        journal={GMDS},<br>
        volume={264},<br>
        pages={1419--1420},<br>
        year={2019} }
      </p>
    </div>
  </div>
</div>

<!-- Script for superduper collapsibles -->
<script>
let myLabels = document.querySelectorAll('.lbl-toggle');

Array.from(myLabels).forEach(label => {
  label.addEventListener('keydown', e => {
    // 32 === spacebar
    // 13 === enter
    if (e.which === 32 || e.which === 13) {
      e.preventDefault();
      label.click();
    };
  });
});
</script>
