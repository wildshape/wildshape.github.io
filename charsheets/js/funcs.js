
// Set the level, max (and starting) HP, and some other key values

let userLEVEL = 1;
let userHP = 15;
let userMaxHP = 15;
let tempHP = 0;
let userAC = 16;
let userSpellAttack = 7; 
let userSpeed = 25;
let userAmmo = 200;
let userMaxAmmo=200;

// Establish core ability modifiers

let userSTR = 0;
let userDEX = 3;
let userCON = 1;
let userINT = 0;
let userWIS = 1;
let userCHA = 4;

// Add any trained skills to list. Also has saving throws
// Note that skills are lower case strings, throws are FORT, REFLEX, and WILL
let trained = ['FORT',
'REFLEX',
'arcana',
'deception',
'diplomacy',
'lore',
'society',
'stealth',
'thievery',
'perception'];

// Same goes for expert, master, and legendary levels

let expert = ['WILL'];
let master = [];
let legendary = [];

// You can ignore everything below here. Values above will be used to do calculations.


let allSkills = [
    'FORT',
    'REFLEX',
    'WILL',
'acrobatics',
'arcana',
'athletics',
'crafting',
'deception',
'diplomacy',
'intimidation',
'lore',
'medicine',
'nature',
'occultism',
'performance',
'religion',
'society',
'stealth',
'survival',
'thievery',
'perception'];

skillmodDict = {};


for (let i = 0; i < allSkills.length; i++) {
    if (trained.includes(allSkills[i])) {
        skillmodDict[allSkills[i]] = userLEVEL + 2
    }
    else if (expert.includes(allSkills[i])) {
        skillmodDict[allSkills[i]] = userLEVEL + 4
    }
    else if (master.includes(allSkills[i])) {
        skillmodDict[allSkills[i]] = userLEVEL + 6
    }
    else if (legendary.includes(allSkills[i])) {
        skillmodDict[allSkills[i]] = userLEVEL + 8
    }
    else {
        skillmodDict[allSkills[i]] = 0
    }
}
let userFORT = userCON+skillmodDict['FORT'];
let userREFLEX = userDEX+skillmodDict['REFLEX'];
let userWILL = userWIS+skillmodDict['WILL'];
let userPerception = userWIS+skillmodDict['perception'];
let userAcrobatics = userDEX+skillmodDict['acrobatics'];
let userArcana = userINT+skillmodDict['arcana'];
let userAthletics = userSTR+skillmodDict['athletics'];
let userCrafting = userINT+skillmodDict['crafting'];
let userDeception = userCHA+skillmodDict['deception'];
let userDiplomacy = userCHA+skillmodDict['diplomacy'];
let userIntimidation = userCHA+skillmodDict['intimidation'];
let userLore = userINT+skillmodDict['lore'];
let userMedicine = userWIS+skillmodDict['medicine'];
let userNature = userWIS+skillmodDict['nature'];
let userOccultism = userINT+skillmodDict['occultism'];
let userPerformance = userCHA+skillmodDict['performance'];
let userReligion = userWIS+skillmodDict['religion'];
let userSociety = userINT+skillmodDict['society'];
let userStealth = userDEX+skillmodDict['stealth'];
let userSurvival = userWIS+skillmodDict['survival'];
let userThievery = userDEX+skillmodDict['thievery'];




function mageArmor(acMod,dexMod){
    mod = userAC + acMod
    document.getElementById("AC").innerHTML = "Armor Class: "+mod;
    document.getElementById("DEX").innerHTML = "DEX <br> +"+ dexMod;
}

function d20(mod) {
    var minNumber = 1; // The minimum number you want
    var maxNumber = 20; // The maximum number you want
    var randomnumber = Math.floor(Math.random() * (maxNumber) + minNumber) + mod; // Generates random number
    document.getElementById("d20").innerHTML = randomnumber; // Sets content of <div> to number
    return false; // Returns false just to tidy everything up
}

function magicMissile(n){   
    var damage = "Damage: "
    var tot = 0
    for (let i = 0; i < n; i++) {
        var minNumber = 1;
        var maxNumber = 4;
        var roll = Math.floor(Math.random()*maxNumber+minNumber)+1;
        tot+=roll
        if (i==n-1){
        damage+=roll
        }
        else {
            damage+=roll + ' + '
        }
    }
damage += " = " + tot
document.getElementById('magicmissile').innerHTML = damage;
}

function damage(d20mod,dmgdice,ndice,damagemod,mapPenalty) {
    var minNumber = 1; // The minimum number you want
    var maxNumber = 20; // The maximum number you want
    var randomnumber1 = Math.floor(Math.random() * (maxNumber) + minNumber) + d20mod; // Generates random number
    
    var minNumber = 1; // The minimum number you want
    var maxNumber = dmgdice; // The maximum number you want
    randomnumber2 = 0
    for (let i = 0; i < ndice; i++) {
      randomnumber2 += Math.floor(Math.random() * (maxNumber) + minNumber);
    }
    randomnumber3 = 2*randomnumber2 + damagemod
    randomnumber2 += damagemod;
    
    
    document.getElementById("roll").innerHTML = randomnumber1;
    document.getElementById("rollMAP1").innerHTML = randomnumber1 - mapPenalty 
    document.getElementById("rollMAP2").innerHTML = randomnumber1 - mapPenalty - mapPenalty 
    document.getElementById("damage").innerHTML = randomnumber2; // Sets content of <div> to number
    document.getElementById("critdamage").innerHTML = randomnumber3;
    return false; // Returns false just to tidy everything up
}

function damageFatal(d20mod,dmgdice,ndice,damagemod,mapPenalty,fatal) {
    var minNumber = 1; // The minimum number you want
    var maxNumber = 20; // The maximum number you want
    var d20roll = Math.floor(Math.random() * (maxNumber) + minNumber) + d20mod; // Generates random number
    
    var minNumber = 1; // The minimum number you want
    var maxNumber = dmgdice; // The maximum number you want
    var damage = 0;
    for (let i = 0; i < ndice; i++) {
      damage += Math.floor(Math.random() * (maxNumber) + minNumber);
    }
    damage += damagemod
    var minNumber = 1; // The minimum number you want
    var maxNumber = fatal; // The maximum number you want
    fataldamage = 0
    for (let i = 0; i < ndice+1; i++) {
      fataldamage += Math.floor(Math.random() * (maxNumber) + minNumber);
    }
    fataldamage+=damagemod
    
    
    document.getElementById("roll").innerHTML = d20roll;
    document.getElementById("rollMAP1").innerHTML = d20roll-mapPenalty ;
    document.getElementById("rollMAP2").innerHTML = d20roll-mapPenalty-mapPenalty ;
    document.getElementById("damage").innerHTML = damage; // Sets content of <div> to number
    document.getElementById("critdamage").innerHTML = fataldamage;
    return false; // Returns false just to tidy everything up
}

function useAmmo(){
    n_use = parseInt(document.getElementById('ammo').value)
    userAmmo = userAmmo -n_use
    current_percentage = (userAmmo / userMaxAmmo) * 100
    document.getElementById('ammoBar').style.width= (current_percentage) +'%';
    document.getElementById('ammo_current').innerHTML = userAmmo;
}

function addAmmo(){
    n_add = parseInt(document.getElementById('ammo').value)
    userAmmo = userAmmo +n_add 
    if (userAmmo>userMaxAmmo){
        userMaxAmmo = userAmmo;
    }
    current_percentage = (userAmmo / userMaxAmmo) * 100
    document.getElementById('ammoBar').style.width= (current_percentage) +'%';
    document.getElementById('ammo_current').innerHTML = userAmmo;
}

function subBar() {
    value = parseInt(document.getElementById('hp').value)
if (tempHP>0){
    if (value>tempHP){
    diff = value - tempHP  
    userHP = userHP - diff 
    tempHP = 0 
    }
    else {
    tempHP = tempHP - value 
    }
}
else {
    if (userHP-value<0){
    userHP = 0;
    }
    else {
    userHP = userHP - value
    }
}
  current_percentage = (userHP / userMaxHP) * 100
  temp_percentage = (tempHP/userMaxHP) * 100
document.getElementById('progressBar').style.width= (current_percentage) +'%';
document.getElementById('temp').style.width= (temp_percentage) +'%';
document.getElementById('hp_current').innerHTML = userHP+tempHP;
}

function addBar() {
value = parseInt(document.getElementById('hp').value)
if (userHP+value>userMaxHP){
    userHP = userMaxHP;
}
else{
    userHP = userHP + value
}
current_percentage = (userHP / userMaxHP) * 100 
document.getElementById('progressBar').style.width= (current_percentage) +'%';
document.getElementById('hp_current').innerHTML = userHP+tempHP;
    }

function setText(id,newvalue) {
    var s= document.getElementById(id);
    s.innerHTML = newvalue;
}

function addTempBar() {
value = parseInt(document.getElementById('hp').value)
tempHP = tempHP + value;
document.getElementById('hp_current').innerHTML = userHP+tempHP;
current_percentage = (tempHP / userMaxHP) * 100 
document.getElementById('temp').style.width= (current_percentage) +'%';
}

window.onload=function() { 
setText("hp_current",userMaxHP);
setText("ammo_current",userMaxAmmo);
mageArmor(0,userDEX);
document.getElementById('walkspeed').innerHTML = 'Walk: '+ userSpeed + ' ft';
document.getElementById('spellattack').innerHTML = 'Spell Attack: +'+ userSpellAttack;
document.getElementById('STR').innerHTML = 'STR<br>+'+ userSTR;
document.getElementById('CON').innerHTML = 'CON<br>+'+ userCON;
document.getElementById('INT').innerHTML = 'INT<br>+'+ userINT;
document.getElementById('WIS').innerHTML = 'WIS<br>+'+ userWIS;
document.getElementById('CHA').innerHTML = 'CHA<br>+'+ userCHA;
document.getElementById('FORT').innerHTML = 'FORT<br>+'+ userFORT;
document.getElementById('REFLEX').innerHTML = 'REFLEX<br>+'+ userREFLEX;
document.getElementById('WILL').innerHTML = 'WILL<br>+'+ userWILL;
document.getElementById('acrobatics').innerHTML = 'Acrobatics +'+ userAcrobatics;
document.getElementById('arcana').innerHTML = 'Arcana +'+ userArcana;
document.getElementById('athletics').innerHTML = 'Athletics +'+ userAthletics;
document.getElementById('crafting').innerHTML = 'Crafting +'+ userCrafting;
document.getElementById('deception').innerHTML = 'Deception +'+ userDeception;
document.getElementById('diplomacy').innerHTML = 'Diplomacy +'+ userDiplomacy;
document.getElementById('intimidation').innerHTML = 'Intimidation +'+ userIntimidation;
document.getElementById('lore').innerHTML = 'Lore (one city) +'+ userLore;
document.getElementById('medicine').innerHTML = 'Medicine +'+ userMedicine;
document.getElementById('nature').innerHTML = 'Nature +'+ userNature;
document.getElementById('occultism').innerHTML = 'Occultism +'+ userOccultism;
document.getElementById('performance').innerHTML = 'Performance +'+ userPerformance;
document.getElementById('religion').innerHTML = 'Religion +'+ userReligion;
document.getElementById('society').innerHTML = 'Society +'+ userSociety;
document.getElementById('stealth').innerHTML = 'Stealth +'+ userStealth;
document.getElementById('survival').innerHTML = 'Survival +'+ userSurvival;
document.getElementById('thievery').innerHTML = 'Thievery +'+ userThievery;
document.getElementById('perception').innerHTML = 'Perception +'+ userPerception;
document.getElementById('initiative').innerHTML = 'Initiative +'+ userPerception;

let skipcss = ['FORT','REFLEX','WILL','perception'];
for (var i = 0; i < trained.length; i++) {
    if (skipcss.includes(trained[i])) {
        document.getElementById(trained[i]).className = "btn btn-outline-success";
        document.getElementById(trained[i]).setAttribute('data-bs-toggle', 'tooltip');
        document.getElementById(trained[i]).setAttribute('data-bs-placement', 'top');
        document.getElementById(trained[i]).setAttribute('title', 'Trained');   
    }
    else {
        document.getElementById(trained[i]).className = "btn btn-success mb-3";
        document.getElementById(trained[i]).setAttribute('data-bs-toggle', 'tooltip');
        document.getElementById(trained[i]).setAttribute('data-bs-placement', 'top');
        document.getElementById(trained[i]).setAttribute('title', 'Trained');
    }

}
for (var i = 0; i < expert.length; i++) {
    if (skipcss.includes(expert[i])){
        document.getElementById(expert[i]).className = "btn btn-outline-primary";
        document.getElementById(expert[i]).setAttribute('data-bs-toggle', 'tooltip');
        document.getElementById(expert[i]).setAttribute('data-bs-placement', 'top');
        document.getElementById(expert[i]).setAttribute('title', 'Expert');
    }
    else {
    document.getElementById(expert[i]).className = "btn btn-primary mb-3";
    document.getElementById(expert[i]).setAttribute('data-bs-toggle', 'tooltip');
    document.getElementById(expert[i]).setAttribute('data-bs-placement', 'top');
    document.getElementById(expert[i]).setAttribute('title', 'Expert');
    }
}
for (var i = 0; i < master.length; i++) {
    if (skipcss.includes(master[i])){
    document.getElementById(master[i]).className = "btn btn-master";
    document.getElementById(master[i]).setAttribute('data-bs-toggle', 'tooltip');
    document.getElementById(master[i]).setAttribute('data-bs-placement', 'top');
    document.getElementById(master[i]).setAttribute('title', 'Master');
    }
    else{
        document.getElementById(master[i]).className = "btn btn-master";
        document.getElementById(master[i]).setAttribute('data-bs-toggle', 'tooltip');
        document.getElementById(master[i]).setAttribute('data-bs-placement', 'top');
        document.getElementById(master[i]).setAttribute('title', 'Master');  
    }
}
for (var i = 0; i < legendary.length; i++) {
    if (skipcss.includes(legendary[i])){
        document.getElementById(legendary[i]).className = "btn btn-outline-warning";
        document.getElementById(legendary[i]).setAttribute('data-bs-toggle', 'tooltip');
        document.getElementById(legendary[i]).setAttribute('data-bs-placement', 'top');
        document.getElementById(legendary[i]).setAttribute('title', 'Legendary');
    }
    else{
        document.getElementById(legendary[i]).className = "btn btn-warning mb-3";
        document.getElementById(legendary[i]).setAttribute('data-bs-toggle', 'tooltip');
        document.getElementById(legendary[i]).setAttribute('data-bs-placement', 'top');
        document.getElementById(legendary[i]).setAttribute('title', 'Legendary');
    }
}
document.getElementById('perception').className = "btn btn-outline-success ml-1";
document.getElementById('maxhp').innerHTML = userMaxHP;
document.getElementById('userLevel').innerHTML = userLEVEL;
}