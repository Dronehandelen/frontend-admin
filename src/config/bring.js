const bringConfig = {
    minVolumeMM3: 1000,
    services: {
        PAKKE_I_POSTKASSE: 3584,
        PAKKE_TIL_HENTESTED: 5800,
    },
    packageTypes: [
        {
            name: 'Brev 1',
            size: {
                width: 200,
                height: 50,
                depth: 270,
            },
        },
        {
            name: 'Box postkasse stor',
            size: {
                width: 230,
                height: 70,
                depth: 340,
            },
        },
        {
            name: 'Box 1',
            size: {
                width: 305,
                height: 205,
                depth: 305,
            },
        },
    ],
};

export default bringConfig;
