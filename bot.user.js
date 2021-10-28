// ==UserScript==
// @name         Energy Air 2021 Game Bot
// @namespace    https://github.com/RoadJDK/Energy-Star-Night-Bot-2021/blob/main/bot.user.js
// @version      1.0
// @description  Win tickets for the Energy Air 2021
// @author       RoadJDK: https://github.com/RoadJDK, ggmanugg: https://github.com/ggmanugg
// @match        game.energy.ch/
// @run-at       document-end
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js
// @match        *://*/recaptcha/api2/*
// @connect      engageub.pythonanywhere.com
// @grant        GM_xmlhttpRequest
// ==/UserScript==
$(document).ready(function() {
    var run = 0;

    const questions = {
        "WAS FÜR EIN INSTRUMENT SPIELT ASH?":"E-Gitarre",
        "WELCHER NIEDERLÄNDISCHE DJ TRAT 2016 BEI DER ENERGY STAR NIGHT AUF?":"Martin Garrix",
        "WELCHE ART TANZ MUSS JOHNNY ERLERNEN?":"Breakdance",
        "WER SPRICHT DIE ROLLE VON ASH AUF DEUTSCH?":"Stefanie Kloss",
        "WIE HEISST DIE LUSTIGE ASSISTENTIN VON BUSTER MOON?":"Miss Crawly",
        "WELCHER ACT HAT AN EINER ENERGY STAR NIGHT BACKSTAGE EINEM FAN EIN TATTOO GESTOCHEN?":"Sido",
        "WIE KOMMT MAN AN TICKETS FÜR DIE ENERGY STAR NIGHT?":"Gewinnen",
        "WER ÜBERZEUGT DEN GROSSEN STAR CLAY CALLOWAY, AN DER SHOW TEILZUNEHMEN?":"Ash",
        "WELCHER ACT WAR NOCH NIE AN DER ENERGY STAR NIGHT DABEI?":"Loredana",
        "WAS FÜR EIN WORT MUSST DU PER SMS SCHICKEN, UM TICKETS ZU GEWINNEN?":"STAR",
        "WIE HEISST DIE FRAU VON HERR BÜNZLI?":"Anegret",
        "WAS WAR DAS BESONDERE AN DER ÜBERGABE DES ENERGY MUSIC AWARD 2020?":"Wir haben Loco Escrito bei der Übergabe geprankt",
        "WELCHER AWARD WIRD IM RAHMEN DER ENERGY STAR NIGHT VERLIEHEN?":"Der Energy Music Award",
        "WIE HEISST DER OFFIZIELLE INSTAGRAM ACCOUNT DER ENERGY STAR NIGHT?":"@energystarnight",
        "WER SPRICHT DIE ORIGINALSTIMME VON CLAY CALLOWAY?":"Bono",
        "WAS IST ENERGY ONE?":"Die Membership von Energy",
        "WELCHES DJ-DUO RIESS 2016 DAS HALLENSTADION AB?":"Remady &amp; Manu L",
        "WEN HAT HERR BÜNZLI AN SEINER ERSTEN ENERGY STAR NIGHT 2017 INTERVIEWT?":"Anastacia &amp; Mark Forster ",
        "WELCHER SCHWEIZER ACT HAT 2019 DEN ENERGY MUSIC AWARD GEWONNEN?":"Luca Hänni",
        "WIE ALT MUSS MAN SEIN, UM OHNE ERWACHSENE BEGLEITUNG AN DER ENERGY STAR NIGHT TEILZUNEHMEN?":"14",
        "WELCHE ZWEI ACTS LASEN AN DER ESN18 BACKSTAGE MEAN TWEETS?":"Olly Murs und James Arthur",
        "AN DER ENERGY STAR NIGHT 2019 HABEN WIR DAS GRÖSSTE TIKTOK-VIDEO MIT 13'000 LEUTEN GEMACHT. WAS FÜR EINE CHALLENGE WAR ES?":"WOKEUPLIKETHISCHALLENGE",
        "WAS WAR DAS THEMA DER LETZTEN ENERGY STAR NIGHT?":"WELCOME TO THE CANDY FACTORY",
        "WELCHER ACT ERÖFFNETE DIE ENERGY STAR NIGHT 2019?":"Tom Gregory",
        "WELCHER YOUTUBE STAR JAMMTE BEIM ENERGY AIR 2017 2017 BACKSTAGE MIT SAMU VON SUNRISE AVENUE? ":"Alex Aiono",
        "WELCHER U2-SONG WIRD IM TRAILER VON SING – DIE SHOW DEINES LEBENS GESPIELT?":"I Still Haven’t Found What I’m Looking For",
        "WO FINDET DIE AFTERSHOW PARTY STATT?":"Hiltl Club",
        "IN WELCHEM JAHR WURDE DAS ENERGY STARS FOR FREE ZUR ENERGY STAR NIGHT?":"2016",
        "WANN BEGINNT DIE ENERGY STAR NIGHT?":"19:00",
        "WELCHER ACT WAR AM ERSTEN ENERGY STARS FOR FREE UND SCHON WEITERE SECHS MAL DABEI?":"Stress",
        "WIE VIELE BESUCHER MACHEN DIE ENERGY STAR NIGHT ZUM GRÖSSTEN INDOOR-MUSIK-EVENT DER SCHWEIZ?":"13'000",
        "WIE LAUTET DER OFFIZIELLE HASHTAG DER ENERGY STAR NIGHT?":"#ESN21",
        "WANN FAND DER EVENT ZUM ERSTEN MAL STATT?":"2003",
        "WIE HEISST DIE TOCHTER DES SHOW MANAGERS?":"Porsha",
        "WANN WIRD DIE ENERGY STAR NIGHT STATTFINDEN?":"19. November 2021",
        "SEIT WANN IST ENERGY LUZERN LIVE ON AIR?":"August 2021",
        "WER HAT DEN ERSTEN ENERGY MUSIC AWARD GEWONNEN?":"Manillo",
        "WO FINDET DIE ENERGY STAR NIGHT STATT?":"Im Hallenstadion Zürich",
        "WO FINDET DIE NEUE MUSIK-SHOW STATT?":"Redshore City",
        "WELCHER HERAUSFORDERUNG MUSS SICH ROSITA IN DER SHOW STELLEN?":"An einem Seil in die Tiefe springen",
        "Question":"Answer",
    }

    function randomNumber () {
        return Math.floor(Math.random() * (1200 - 800 + 1)) + 1200; //speed
    }

    function currentQuestion () {
        if ($('h3.question-text').html() != null){
            return $('h3.question-text').html().toUpperCase()
        }
    }

    function nextQuestion () {
        $('button#next-question').trigger('click')
        setTimeout(makeAction, randomNumber())
    }

    function startGame () {
        console.log('game starten')
        $('.game-button').trigger('click');
        setTimeout(answerQuestion, randomNumber())
    }

    function restartGame () {
        console.log('restart')
        $('button#lose').trigger('click');
        location.reload()
        setTimeout(makeAction, randomNumber())
    }

    function selectBubble () {
        console.log('bubble auswählen')
        document.getElementsByTagName('img')[2].click();
        setTimeout(makeAction, randomNumber())
    }

    function decisionTicket () {
        console.log('sagen dass tickets gewinnen')
        document.getElementsByTagName('img')[2].click();
        setTimeout(selectBubble, randomNumber())
    }

    function answerQuestion () {
        let curr = currentQuestion()
        console.log(curr, questions[curr])
        $('#answers .answer-wrapper').each((i, el) => {
            if ($(el).children('label').html() === questions[curr]) {
                $(el).children('input').trigger('click')
            }
        })
        setTimeout(nextQuestion, randomNumber())
    }

    function makeAction () {
        if (run >= 15) {
            location.reload()
        }
        bypassCaptcha()
        if (document.getElementById('lose')){
            console.clear()
            console.log('run: ' + run)
            run = run + 1
            restartGame()
        } else if (document.getElementsByTagName('h3')[0].innerText == 'DU HAST DIE ERSTE HÜRDE GESCHAFFT.\nUM WELCHEN PREIS MÖCHTEST DU SPIELEN?'){
            decisionTicket()
        } else if (document.getElementById('verification')){
            startGame()
        } else {
            answerQuestion()
        }
    }

    (function() {
        'use strict';

        console.log('starting...')
        makeAction()

    })();

});

//bypass captcha. source: https://greasyfork.org/en/scripts/430593-recaptcha-solver-automatically-solves-recaptcha-in-browser

function bypassCaptcha() {
    var solved = false;
    var checkBoxClicked = false;
    var waitingForAudioResponse = false;
    //Node Selectors
    const CHECK_BOX = ".recaptcha-checkbox-border";
    const AUDIO_BUTTON = "#recaptcha-audio-button";
    const PLAY_BUTTON = ".rc-audiochallenge-play-button .rc-button-default";
    const AUDIO_SOURCE = "#audio-source";
    const IMAGE_SELECT = "#rc-imageselect";
    const RESPONSE_FIELD = ".rc-audiochallenge-response-field";
    const AUDIO_ERROR_MESSAGE = ".rc-audiochallenge-error-message";
    const AUDIO_RESPONSE = "#audio-response";
    const RELOAD_BUTTON = "#recaptcha-reload-button";
    const RECAPTCHA_STATUS = "#recaptcha-accessible-status";
    const DOSCAPTCHA = ".rc-doscaptcha-body";
    const VERIFY_BUTTON = "#recaptcha-verify-button";
    const MAX_ATTEMPTS = 5;
    var requestCount = 0;
    var recaptchaLanguage = qSelector("html").getAttribute("lang");
    var audioUrl = "";
    var recaptchaInitialStatus = qSelector(RECAPTCHA_STATUS) ? qSelector(RECAPTCHA_STATUS).innerText : ""
    //Check for visibility && Click the check box
    function isHidden(el) {
        return(el.offsetParent === null)
    }

    async function getTextFromAudio(URL) {
        requestCount = requestCount + 1;
        URL = URL.replace("recaptcha.net", "google.com");
        if(recaptchaLanguage.length < 1) {
            console.log("Recaptcha Language is not recognized");
            recaptchaLanguage = "en-US";
        }
        console.log("Recaptcha Language is " + recaptchaLanguage);
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://engageub.pythonanywhere.com",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: "input=" + encodeURIComponent(URL) + "&lang=" + recaptchaLanguage,
            timeout: 15000,
            onload: function(response) {
                console.log("Response::" + response.responseText);
                try {
                    if(response && response.responseText) {
                        var responseText = response.responseText;
                        //Validate Response for error messages or html elements
                        if(responseText == "0" || responseText.includes("<") || responseText.includes(">") || responseText.length < 2 || responseText.length > 50) {
                            //Invalid Response, Reload the captcha
                            console.log("Invalid Response. Retrying..");
                        } else if(qSelector(AUDIO_SOURCE) && qSelector(AUDIO_SOURCE).src && audioUrl == qSelector(AUDIO_SOURCE).src && qSelector(AUDIO_RESPONSE)
                                  && !qSelector(AUDIO_RESPONSE).value && qSelector(AUDIO_BUTTON).style.display == "none" && qSelector(VERIFY_BUTTON)) {
                            qSelector(AUDIO_RESPONSE).value = responseText;
                            qSelector(VERIFY_BUTTON).click();
                        } else {
                            console.log("Could not locate text input box")
                        }
                        waitingForAudioResponse = false;
                    }

                } catch(err) {
                    console.log(err.message);
                    console.log("Exception handling response. Retrying..");
                    waitingForAudioResponse = false;
                }
            },
            onerror: function(e) {
                console.log(e);
                waitingForAudioResponse = false;
            },
            ontimeout: function() {
                console.log("Response Timed out. Retrying..");
                waitingForAudioResponse = false;
            },
        });
    }

    function qSelectorAll(selector) {
        return document.querySelectorAll(selector);
    }

    function qSelector(selector) {
        return document.querySelector(selector);
    }

    //Solve the captcha using audio
    var startInterval = setInterval(function() {
        try {
            if(!checkBoxClicked && qSelector(CHECK_BOX) && !isHidden(qSelector(CHECK_BOX))) {
                //console.log("checkbox clicked");
                qSelector(CHECK_BOX).click();
                checkBoxClicked = true;
            }
            //Check if the captcha is solved
            if(qSelector(RECAPTCHA_STATUS) && (qSelector(RECAPTCHA_STATUS).innerText != recaptchaInitialStatus)) {
                solved = true;
                console.log("SOLVED");
                clearInterval(startInterval);
            }
            if(requestCount > MAX_ATTEMPTS) {
                console.log("Attempted Max Retries. Stopping the solver");
                solved = true;
                clearInterval(startInterval);
            }
            if(!solved) {
                if(qSelector(AUDIO_BUTTON) && !isHidden(qSelector(AUDIO_BUTTON)) && qSelector(IMAGE_SELECT)) {
                    // console.log("Audio button clicked");
                    qSelector(AUDIO_BUTTON).click();
                }
                if((!waitingForAudioResponse && qSelector(AUDIO_SOURCE) && qSelector(AUDIO_SOURCE).src
                    && qSelector(AUDIO_SOURCE).src.length > 0 && audioUrl == qSelector(AUDIO_SOURCE).src
                    && qSelector(RELOAD_BUTTON)) ||
                   (qSelector(AUDIO_ERROR_MESSAGE) && qSelector(AUDIO_ERROR_MESSAGE).innerText.length > 0 && qSelector(RELOAD_BUTTON))){
                    qSelector(RELOAD_BUTTON).click();
                } else if(!waitingForAudioResponse && qSelector(RESPONSE_FIELD) && !isHidden(qSelector(RESPONSE_FIELD))
                          && !qSelector(AUDIO_RESPONSE).value && qSelector(AUDIO_SOURCE) && qSelector(AUDIO_SOURCE).src
                          && qSelector(AUDIO_SOURCE).src.length > 0 && audioUrl != qSelector(AUDIO_SOURCE).src
                          && requestCount <= MAX_ATTEMPTS) {
                    waitingForAudioResponse = true;
                    audioUrl = qSelector(AUDIO_SOURCE).src
                    getTextFromAudio(audioUrl);
                }else {
                    //Waiting
                }
            }
            //Stop solving when Automated queries message is shown
            if(qSelector(DOSCAPTCHA) && qSelector(DOSCAPTCHA).innerText.length > 0) {
                console.log("Automated Queries Detected");
                clearInterval(startInterval);
            }
        } catch(err) {
            console.log(err.message);
            console.log("An error occurred while solving. Stopping the solver.");
            clearInterval(startInterval);
        }
    }, 5000);

};
