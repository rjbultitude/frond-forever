import $             from 'jquery';
import FetchSounds from './modules/fetch-sounds';

$(() => {

    var $fetchSounds = $('[data-behavior="fetch-sounds"]');

    if ($fetchSounds.length > 0) {

        new FetchSounds($fetchSounds);

    }

});
