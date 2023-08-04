# the FAIR extension

[![fair-software.eu](https://img.shields.io/badge/fair--software.eu-%E2%97%8F%20%20%E2%97%8F%20%20%E2%97%8F%20%20%E2%97%8F%20%20%E2%97%8B-yellow)](https://fair-software.eu)

<p align="center">
<img src="https://github.com/MaastrichtU-Library/the-FAIR-extension/blob/main/img/theFAIRextensionLogo.png" alt="logo" class="center" style="width: 50%; height: 50%"/>
</p>

"The FAIR extension" is an open-source web browser extension that allows researchers to do FAIR metrics evaluations directly to the web source. 👩🏻‍💻🚦<br>

---
## Quickstart for Users
### To run the extension as a user:<br>
1. Go to the [Google Chrome Store](https://chrome.google.com/webstore/detail/the-fair-extension/pjmiddoifhbhbfcppdbmaigdeoiochdg) and add the extension to your browser.<br>
2. Navigate to the webpage you want to evaluate.<br>
3. Activate the extension by clicking on its icon.<br>
4. The extension will detect and highlight DOIs on the webpage. Click "Evaluate" next to a DOI to assess it.<br>
5. Open the extension popup by clicking its icon on the top-right of your browser to see the evaluation results.<br>

__Note:__ The evaluation process takes 2 to 5 seconds, depending on the website. ⚠️

__Warning:__ When the extension is active, it can mess with some websites (e.g. YouTube). This is a known bug, and we'll solve it soon.
A workaround is to select "On click" access. This config indicates that the extension should only work when you click it, not "all the time."

**👉🏼 [chrome://extensions/](chrome://extensions/) > Details > Site access > On click**

**Try the extension with some of the following examples:**

- FAIR principle publication: [doi.org/10.1038/sdata.2016.18](https://doi.org/10.1038/sdata.2016.18)  
- Zenodo RDFLib library: [doi.org/10.5281/zenodo.1486394](https://doi.org/10.5281/zenodo.1486394)  
- Wikidata DOI publication: [doi.org/10.1016/J.JBI.2019.103292](https://doi.org/10.1016/J.JBI.2019.103292)  
- Dataverse NL dataset: [doi.org/10.34894/Q80QUE](https://doi.org/10.34894/Q80QUE)  
- FAIR Data Point dataset: [w3id.org/ejp-rd/fairdatapoints/wp13/dataset/c5414323-eab1-483f-a883-77951f246972](https://w3id.org/ejp-rd/fairdatapoints/wp13/dataset/c5414323-eab1-483f-a883-77951f246972)  
- Pangea dataset: [doi.org/10.1594/PANGAEA.908011](https://doi.org/10.1594/PANGAEA.908011)  
- Bio2RDF publication: [doi.org/10.1016/j.jbi.2008.03.004](https://doi.org/10.1016/j.jbi.2008.03.004)  
- Kaggle dataset: [www.kaggle.com/allen-institute-for-ai/CORD-19-research-challenge](https://www.kaggle.com/allen-institute-for-ai/CORD-19-research-challenge)  
- NeuroDKG publication: [doi.org/10.5281/zenodo.5541440](https://doi.org/10.5281/zenodo.5541440)  
- Human Protein Atlas page: [proteinatlas.org/ENSG00000084110-HAL](https://www.proteinatlas.org/ENSG00000084110-HAL)  
- ORCID profile: [orcid.org/0000-0002-1501-1082](https://orcid.org/0000-0002-1501-1082)  

---
## Quickstart for Developers

### To edit the project:<br>
1. Download the project as a Zip folder.<br>
2. Extract the folder.<br>
3. Open the project in a code editor such as Visual Studio Code.<br>

### Working files:
 - **Manifest.json**: Controls the structure of the extension, from essential elements like the title to complex features such as permissions and workflows.<br>
 - **background.js**: Acts as a medium between the extension's files, maintaining communication between content scripts and popup JSON files. It also handles redirection to the DOI.<br>
 - **popup.js**: Triggered by index.html. It modifies the user's view of the popup, including the DOI evaluation. This file also controls the communication between the extension and the FAIR-enough API.<br>
 - **index.html**: The front end of the Chrome extension's popup. You can edit the style of the extension in this file.<br>
 - **contentScript.js**: Triggered when the extension is given access. It injects scripts into the website to highlight text, detects DOIs in the webpage, injects code to highlight them and adds buttons next to them, and sends the indicated DOI to background.js for evaluation.<br>

---
## Use Cases  

1. A student wanting to use a DO (e.g. software package) must know which to choose. The FAIR extension will indicate which one is more FAIR and aid the decision-making process
2. A Data steward recommending sources
3. A researcher who wants to display all FAIR metrics of their DOs on a research profile
4. A PI that wants to evaluate an aggregated metric for a project.

---
## About 👓

The scientific community’s efforts have increased regarding evaluating the FAIRness of research Digital Objects such as publications, datasets, or research software. However, this requires a steep learning curve for the average researcher when learning the FAIR evaluation frameworks, disengaging some.

This project aims to use technology close this gap and make this process more accessible by bringing the FAIR evaluation to the researcher’s profiles. “The FAIR extension” is an open-source, user-friendly web browser extension allowing researchers to do FAIRness evaluations directly from scholarly aggregators such as PURE, Google Scholar, or ResearchGate without additional knowledge. The browser extension follows the FAIR metrics group specification, building on top of the community-accepted FAIR evaluators’ APIs. 

We aim to demonstrate that low-entry-level tools can bridge the gap between the researcher and the FAIR metrics. e.g. A data steward recommending FAIR sources or a researcher evaluating all FAIR metrics directly on scholarly profiles.

The development of this extension is made possible thanks to the [Netherlands eScience Center fellowship grant 2022-2023](https://www.esciencecenter.nl/fellowship-programme/)

### - Contact

If there is an issue, please open one at [Issues](https://github.com/MaastrichtU-Library/the-FAIR-extension/issues). Else, contact directly at [p.hernandezserrano@maastrichtuniversity.nl](p.hernandezserrano@maastrichtuniversity.nl)

### - Research Software Quality Checklist

Following the Software Sustainability Institute’s software evaluation approach

- [Software Evaluation: Criteria-based Assessment](https://software.ac.uk/sites/default/files/SSI-SoftwareEvaluationCriteria.pdf)
- [Sustainability Evaluation Report](https://docs.google.com/document/d/1YFrTor7yVQ-3Xpcn3ds38T0qhvSzjCUJCvVsf2b8TRg/edit)

<img src="https://github.com/MaastrichtU-Library/the-FAIR-extension/blob/main/img/sustainabilityreport.png" alt="logo" lign="middle" style="width: 50%; height: 50%"/>

---
## Terms of Use 📃

### - Licence

Copyright (c) 2022 Maastricht University Library

[The code contained in this Github repository](https://github.com/MaastrichtU-Library/the-FAIR-extension) is free software: you can redistribute it and modify it under the terms of the [Apache 2.0 License](https://opensource.org/licenses/Apache-2.0) compatible with many copyleft licenses such as the GNU General Public License.

### - Research Software Citation

Machine-actionable citation file: [CITATION.cff](https://github.com/MaastrichtU-Library/the-FAIR-extension/blob/main/CITATION.cff)  
Should you require another format for citation, you can convert it using the [cff-converter Tool](https://github.com/citation-file-format/cff-converter-python)

### - Paper Citation 

```
@article{10.3897/rio.8.e95006,
	author = {Pedro Hernandez Serrano and Vincent Emonet},
	title = {The FAIR extension: A web browser extension to evaluate Digital Object FAIRness},
	volume = {8},
	number = {},
	year = {2022},
	doi = {10.3897/rio.8.e95006},
	publisher = {Pensoft Publishers},
	pages = {e95006},
	URL = {https://doi.org/10.3897/rio.8.e95006},
	eprint = {https://doi.org/10.3897/rio.8.e95006},
	journal = {Research Ideas and Outcomes}
}

```
