the FAIR extension

[![npm version](https://badge.fury.io/js/npm.svg)](https://badge.fury.io/js/npm)
[![fair-software.eu](https://img.shields.io/badge/fair--software.eu-%E2%97%8F%20%20%E2%97%8F%20%20%E2%97%8F%20%20%E2%97%8B%20%20%E2%97%8B-orange)](https://fair-software.eu)

<img src="https://github.com/MaastrichtU-Library/the-FAIR-extension/blob/main/img/theFAIRextensionLogo.png" alt="logo" lign="middle" style="width: 50%; height: 50%"/>

"The FAIR extension", an open-source, user-friendly web browser extension that allows researchers to do FAIRness evaluations directly to the web source.<br>

---
## Quickstart for Users
### To run the extension as user:<br>
1- Download the project as Zip folder <br>
2- Extract the folder<br>
3- Go to Extensions page in Google Chrome<br>
4- Activate Developer mode on top-right<br>
5-Load unpacked -> downloaded project folder -> select folder<br>
6-Click on Details<br>
7-Change Site Access from "On all sites" to "On click"  <br>

### Now you are set to use the extension on the page of your choice, let us see an example of how the extension works, for this example we will look at the following article (https://www.frontiersin.org/articles/10.3389/frcmn.2022.824593/full) :

STEP 1: open the website and give access to the extension.<br>
<img src="https://github.com/MaastrichtU-Library/the-FAIR-extension/blob/main/img/user1.png" alt="logo" lign="middle" style="width: 60%; height: 60%"/>

STEP 2: The DOI's will be detected and highlighted, next step would be clicking the extension again<br>
<img src="https://github.com/MaastrichtU-Library/the-FAIR-extension/blob/main/img/user2.png" alt="logo" lign="middle" style="width: 60%; height: 60%"/>

STEP 3: The list of DOI's will be previewed, the FAIR score of the first detected DOI can also be seen. <br>
<img src="https://github.com/MaastrichtU-Library/the-FAIR-extension/blob/main/img/user3.png" alt="logo" lign="middle" style="width: 60%; height: 60%"/>


---
## Quickstart for Developers
### Prerequisities: NodeJS, code editor. 
### In this section, the steps needed for editing the project will be previewed: <br>
1- Download the project as Zip folder <br>
2- Extract the folder<br>
3- Use a code editor such as visual studio code to edit the files.<br>
### Change to those files will do the following:
 - Manifest.json: This files controls the structure of the extension from the most basic elements such as the title to the most complex such as the permissions and the workflow of the extension.<br> <br>
 - background.js: This file is considered the medium between the files of the extension, maintains the communication between content scripts and popup json files.<br> <br>

 - popup.js: This file is trigerred using index.html. Its job is to edit anything that the user views on the popup such as the list of DOIs. Additionally, this file controls the communcation between the extension and the FAIR-enough API. <br>
 __NOTE: any changes to popup.js file would not change anything as the file should be converted into bundle.js, the steps will be shown below .__
 <br> <br>
 
  - index.html: The frontend of the chrome extension's popup. The style of the extension can be edited in this file. <br> <br>
  
  - contentScript.js: This file is trigerred when the extension is clicked. Injecting scripts into the website, which is used to highlight the text, is done here. Any changes to the website has to be included in this file. This file is responsible for detecting DOI's in the webpage, injecting code to highlight them, and sending the list of DOI's to background.js.   <br> <br>
  - bundle.js: This file is the result of popup.js + the libraries used in that file. This is done becuase chrome extensions do not understand packages. Therefore, Browserify, an npm package, takes a js file and includes the whole code from a library in a file.
  __Note:Do not change this file manually as this is a file automatically generated by Browserify.__ <br> <br>
### How to edit popup.js:
After applying changes to popup.js you have to do the following:<br>
1- Make sure you can use npm from the terminal.<br>
2-Open terminal in the folder that includes popup.js<br>
3- Make sure all the packages used in popup.js is installed on your npm, for example, if xmlhttprequest is included, make sure you run the following command: __npm install xmlhttprequest__<br>
4- install Browserify using the following command: __npm install browserify__<br>
5- run the following command: __browserify popup.js -o bundle.js__<br>

### Testing the extension
After applying any changes and saving them, follow the steps in "Quickstart for users" in order to test the extension.



---
## Use Cases  

1. A student wanting to make use of a DO (e.g. software package), but doesn't know which to choose. The FAIR extension will indicate which one is more FAIR and aid the decision making process
2. A Data steward recommending sources
3. A researcher who wants to display all FAIR metrics of her DOs on a research profile
4. A PI that wants to evaluate an aggregated metric for a project.

---
## About 👓

The scientific community’s efforts have increased regarding evaluating the FAIRness of research Digital Objects such as publications, datasets, or research software. However, this requires a steep learning curve for the average researcher when learning the FAIR evaluation frameworks, disengaging some of them in the process.

This project aims to use technology close this gap and make this process more accessible by bringing the FAIR evaluation to the researcher’s profiles. “The FAIR extension” is an open-source, user-friendly web browser extension that allows researchers to do FAIRness evaluations directly from scholarly aggregators such as PURE, Google Scholar, or ResearchGate without any additional knowledge. The browser extension follows the FAIR metrics group specification, building on top of the community-accepted FAIR evaluators’ APIs. 

We aim to demonstrate that using low-entry-level tools can bridge the gap between the researcher and the FAIR metrics. e.g. A data steward recommending FAIR sources or a researcher evaluating all FAIR metrics directly on scholarly profiles.

The development of this extension is made possible thanks to the [Netherlands eScience Center fellowship grant 2022-2023](https://www.esciencecenter.nl/fellowship-programme/)

### - Contact

In case there is an issue please open one at [Issues](https://github.com/MaastrichtU-Library/the-FAIR-extension/issues). Else, contact directly at[p.hernandezserrano@maastrichtuniversity.nl](p.hernandezserrano@maastrichtuniversity.nl)

### - Research Software Quality Checklist

Following the Software Sustainability Institute’s software evaluation approach

- [Software Evaluation: Criteria-based Assessment](https://software.ac.uk/sites/default/files/SSI-SoftwareEvaluationCriteria.pdf)
- [Sustainability Evaluation Report](https://docs.google.com/document/d/1YFrTor7yVQ-3Xpcn3ds38T0qhvSzjCUJCvVsf2b8TRg/edit)

<img src="https://github.com/MaastrichtU-Library/the-FAIR-extension/blob/main/img/sustainabilityreport.png" alt="logo" lign="middle" style="width: 50%; height: 50%"/>

---
## Terms of Use 📃

### - Licence

Copyright (c) 2022 Maastricht University Library

[The code contained in this Github repository](https://github.com/MaastrichtU-Library/the-FAIR-extension) is free software: you can redistribute it and/or modify it under the terms of the [MIT License](https://mit-license.org/) compatible with many copyleft licenses such as the GNU General Public License.

### - Research Software Citation

Machine-actionable ciation file: [CITATION.cff](https://github.com/MaastrichtU-Library/the-FAIR-extension/blob/main/CITATION.cff)  
Should you require another format for citation you can convert it using the [cff-converter Tool](https://github.com/citation-file-format/cff-converter-python)

### - Preprint Citation 

```
@misc{hernandez_serrano_pedro_v_2022_7165270,
  author       = {Hernández Serrano, Pedro V. and
                  Emonet, Vincent},
  title        = {{The FAIR extension: A web browser extension to 
                   evaluate Digital Object FAIRness}},
  month        = oct,
  year         = 2022,
  publisher    = {Zenodo},
  doi          = {10.5281/zenodo.7165270},
  url          = {https://doi.org/10.5281/zenodo.7165270}
}
```



