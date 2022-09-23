import Dropdown from "./dropdown";

const dropdownGuests = document.getElementById('dropdown-guests');
const dropdownRooms = document.getElementById('dropdown-rooms');
const dropdownRoomsInit = new Dropdown(dropdownRooms);
const dropdownGuestsInit = new Dropdown(dropdownGuests);
console.log(localStorage.getItem('guests'));
