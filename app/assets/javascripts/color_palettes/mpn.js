/* mpn65 palette start here. ************************************************/

/* The ‘mpn65’ palette is designed for systems which show many graphs which
 don’t have custom colour palettes chosen by humans or if number of necessary
 colours isn’t know a priori. */

function mpnPalette(palette) {
        var scheme = palette.Scheme.fromPalettes('mpn65', 'qualitative', [[
            'ff0029', '377eb8', '66a61e', '984ea3', '00d2d5', 'ff7f00', 'af8d00',
            '7f80cd', 'b3e900', 'c42e60', 'a65628', 'f781bf', '8dd3c7', 'bebada',
            'fb8072', '80b1d3', 'fdb462', 'fccde5', 'bc80bd', 'ffed6f', 'c4eaff',
            'cf8c00', '1b9e77', 'd95f02', 'e7298a', 'e6ab02', 'a6761d', '0097ff',
            '00d067', '000000', '252525', '525252', '737373', '969696', 'bdbdbd',
            'f43600', '4ba93b', '5779bb', '927acc', '97ee3f', 'bf3947', '9f5b00',
            'f48758', '8caed6', 'f2b94f', 'eff26e', 'e43872', 'd9b100', '9d7a00',
            '698cff', 'd9d9d9', '00d27e', 'd06800', '009f82', 'c49200', 'cbe8ff',
            'fecddf', 'c27eb6', '8cd2ce', 'c4b8d9', 'f883b0', 'a49100', 'f48800',
            '27d0df', 'a04a9b'
        ]]);
        scheme.shrinkByTakingHead(true);
        palette.register(scheme);
}