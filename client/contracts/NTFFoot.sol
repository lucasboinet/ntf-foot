// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


/**
 * @title NTFFoot
 * @dev Gere tout le jeu NTFFoot
 */
contract NTFFoot {


    // La structure du personnage à collectionner
    struct Perso { 
        uint16 rang;
        string name;
        uint16 idCheveux;
        uint16 idYeux;
        uint16 idNez;
        uint16 idBouche;
        uint16 idCouleur;
        uint16 force;
        uint16 vitesse;
        uint16 technique;
    }

    // Le tableau regroupant tout les persos
    Perso[] public persos;

    // Mapping associant chaque perso à son propriétaire
    mapping (uint => address) public persoToOwner;
    // Mapping associant à chaque propriétaire son nombre de persos possédés
    mapping (address => uint) public ownerPersoCount;
    // Mapping associant à chaque propriétaire son perso actif
    mapping (address => uint) public ownerToActive;
    // Mapping associant à chaque propriétaire à son niveau d'adversaire
    mapping (address => uint) public ownerToOpponent;

    /*
    * Fonction de création d'un perso (ouverture de pack)
    */
    function createPerso(string memory _name, uint16 _idCheveux, uint16 _idYeux, uint16 _idNez, uint16 _idBouche, uint16 _idCouleur, uint16 _ifCher) public returns(string memory) {

        
        // Paiement
        // if(_ifCher == 1) {
        //     payementMaxi();
        // } else {
        //     payementMini();
        // }
        // sendViaCall();
        

        // init des variables des stats
        uint16 _forceValue;
        uint16 _vitesseValue;
        uint16 _techniqueValue;
        // Les valeurs crées sont associées aux caractéristiques correspondantes
        (_forceValue, _vitesseValue, _techniqueValue) = createStats();
        // Création d'un objet Perso avec ses propriétés / insertion dans le tableau des persos / récupération du rang dans le dit tableau
        // uint id = persos.push(Perso(_name, _forceValue, _vitesseValue, _techniqueValue)) - 1;
        uint16 _rang = uint16(persos.length);
        persos.push(Perso(_rang, _name, _idCheveux, _idYeux, _idNez, _idBouche, _idCouleur, _forceValue, _vitesseValue, _techniqueValue));
        uint _id = persos.length - 1;
        // Association du nouveau perso à son propriétaire
        persoToOwner[_id] = msg.sender;
        // Incrémentation un compteur de persos pour le propriétaire
        ownerPersoCount[msg.sender]++;

        ownerToActive[msg.sender] = _id;

        return "100";

    }


    /*
    * Fonction de récupération des persos d'un joueur
    */
    function getPersoList() public view returns(Perso [] memory ) {
        
        Perso[] memory _persosOwnedList = new Perso[](ownerPersoCount[msg.sender]);
        uint _j = 0;

        for (uint i=0; i<(persos.length); i++) {
            if(persoToOwner[i] == msg.sender) {
                _persosOwnedList[_j] = persos[i];
                _j++;
            }
        }

        return _persosOwnedList;
    }


    /*
    * Fonction de définition du perso actif
    */
    function getPersoActive() public view returns(Perso memory _actif) {
        
        uint _idActif = ownerToActive[msg.sender];
        _actif = persos[_idActif];
        return _actif;

    }

    /*
    * Fonction de définition du perso actif
    */
    function setPersoActive(uint _idPerso) public {
        
        ownerToActive[msg.sender] = _idPerso;

    }



    /*
    * Fonction des infos du combat
    *
    function getOpponent() public {
        
    }


    *
    * Fonction de combat
    *
    function goFight() public {
        
    }
    */


    /*
    * Fonction de génération des stats d'un nouveau perso
    */
    function createStats() public view returns(uint16 _ramdomForce, uint16 _ramdomVitesse, uint16 _ramdomTechnique){
        // Récupération du timestamp et conversion en string
        string memory _randomStatString = uintToString(block.timestamp);
        // Hachage et conversion en uint pour pseudo-random
        uint _randomStat = uint(keccak256(abi.encodePacked(_randomStatString)));
        // Récupération des valeurs en parcourant le nombre (valeur entre 00 et 99)
        _ramdomForce = uint16((_randomStat % 10**4 )/ 10**2);
        _ramdomVitesse = uint16((_randomStat % 10**6 )/ 10**4);
        _ramdomTechnique = uint16((_randomStat % 10**8 )/ 10**6);
        // Renvoi des valeurs pour la création du perso
        return (_ramdomForce, _ramdomVitesse, _ramdomTechnique);
    }

    /*
    * Fonction de conversion d'un entier (uint) en String
    * Récupérée
    */
    function uintToString(uint v) public pure returns (string memory str) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        while (v != 0) {
            uint remainder = v % 10;
            v = v / 10;
            reversed[i++] = bytes1(uint8((48 + remainder)));
        }
        bytes memory s = new bytes(i + 1);
        for (uint j = 0; j <= i; j++) {
            s[j] = reversed[i - j];
        }
        str = string(s);
    }


    /*
    * Fonction de paiement du pack 1
    */
    function payementMini() public payable{
        require(msg.value == .001 ether);
    }

    /*
    * Fonction de paiement du pack 2
    */
    function payementMaxi() public payable{
        require(msg.value == .01 ether);
    }

    fallback() external payable {}
    
    receive() external payable {}

    function sendViaCall(address payable _to) public payable {
        // Call returns a boolean value indicating success or failure.
        // This is the current recommended method to use.
        (bool sent, bytes memory data) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }

}