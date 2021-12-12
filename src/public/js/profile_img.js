const avatars = ['img/avatar_1.png',
                 'img/avatar_2.png',
                 'img/avatar_3.png',
                 'img/avatar_4.png',
                 'img/avatar_5.png',
                 'img/avatar_6.png',
                 'img/avatar_7.png',
                 'img/avatar_8.png',
                 'img/avatar_9.png',
                 'img/avatar_10.png'];

var item = avatars[Math.floor(Math.random()*avatars.length)];
document.getElementById("avatar").src = item;

if ( document.getElementById("avatar-profile")) {
    document.getElementById("avatar-profile").src = item;
}