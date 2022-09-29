/* globals $ */
"use strict";
// Wait for ready
$(document).ready(function () {
    let nameDomain = window.location.hostname.split('.')[0];
    // Uppercase nameDomain
    $('.name').text(nameDomain);

    async function start() {
        let typpingSsh = $('#typpingSsh');
        await typeText(typpingSsh, 'ssh ' + nameDomain, 20, 80);
        await wait(500);

        $('#cursor1').css('visibility', 'hidden');

        $('#block1').removeClass("d-none");

        let now = new Date();
        // Format Wed Sep 28 16:56:25 UTC 2022
        let dayOfWeekText = now.toLocaleString('en-us', { weekday: 'short' });
        let monthText = now.toLocaleString('en-us', { month: 'short' });
        let dayOfMonth = now.getDate();
        let hour = now.getHours();
        let minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
        let second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
        let year = now.getFullYear();
        $('#date').text(
            `${dayOfWeekText} ${monthText} ${dayOfMonth} ${hour}:${minute}:${second} ${year}`
        );

        await wait(500);
        $('#about_meText').removeClass("d-none");

        await wait(500);

        let typpingAboutMe = $('#typpingAboutMe');
        await typeText(typpingAboutMe, 'ls', 50, 100);
        await wait(500);

        $('#cursor2').css('visibility', 'hidden');
        $('#block2').removeClass("d-none");
        $('#selectorShow').removeClass("d-none");

    }
    setTimeout(start, 500);

    let typpyingSelector = $('#typpingSelector');

    $('#aboutMe').click(async function () {
        typpyingSelector.text('');
        $('#aboutMeBlock').addClass("d-none");
        $('#projectsBlock').addClass("d-none");
        $('#skillsBlock').addClass("d-none");

        await typeText(typpyingSelector, "cat 'About Me.txt'", 10, 50);
        await wait(500);
        $('#cursor3').css('visibility', 'hidden');

        $('#aboutMeBlock').removeClass("d-none");



    });

    $('#skills').click(async function () {
        typpyingSelector.text('');
        $('#aboutMeBlock').addClass("d-none");
        $('#projectsBlock').addClass("d-none");
        $('#skillsBlock').addClass("d-none");

        await typeText(typpyingSelector, "/bin/bash loadSkills.sh", 10, 50);
        await wait(500);
        $('#cursor3').css('visibility', 'hidden');

        fillBar("nodejs", 50);
        fillBar("angular", 50);
        fillBar("typescript", 50);
        fillBar("javascript", 50);
        fillBar("mongodb", 50);
        fillBar("SQL", 50);
        fillBar("python", 50, 47);
        fillBar("bash", 50, 40);
        fillBar("java", 50, 45);
        fillBar("tensorflow", 50, 30);

        $('#skillsBlock').removeClass("d-none");

        await wait(500);

    });

    $('#projects').click(async function () {
        typpyingSelector.text('');
        $('#aboutMeBlock').addClass("d-none");
        $('#projectsBlock').addClass("d-none");
        $('#skillsBlock').addClass("d-none");

        await typeText(typpyingSelector, "node projects.js", 10, 50);
        await wait(500);
        $('#cursor3').css('visibility', 'hidden');

        $('#projectsBlock').removeClass("d-none");





    });


    async function fillBar(id, number, max = number) {
        // Fill it with . number times
        let node = $('#' + id);
        let nodePercent = $('#' + id + 'Percent');

        let text = new Array(number).fill('.').join('');
        let percent = 0;
        node.text(text);
        nodePercent.text(percent + '%');
        for (let i = 0; i <= number; i++) {
            if (i > max) break;
            await wait(randomNumberBetween(10, 50));
            text = text.replace('.', '#');
            node.text(text);

            percent = Math.round((i / number) * 100);
            nodePercent.text(percent + '%');
        }
    }

    function randomNumberBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function wait(time = 1000) {
        return new Promise((resolve, reject) => { setTimeout(resolve, time); });
    }

    function typeText(element, text, minTimeout, maxTimeout) {
        return new Promise(async (resolve) => {
            let i = 0;
            for (let char of text) {
                let interval = randomNumberBetween(minTimeout, maxTimeout);
                await wait(interval).then(() => {
                    element.append(char);
                });
            }
            resolve();
        });
    }
});

