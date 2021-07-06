import React from 'react';

import BarcodeContext from '../contexts/barcode';

const BarcodeScanner = ({ children }) => {
    const [currentBarcode, setCurrentBarcode] = React.useState(null);

    React.useEffect(() => {
        let code = '';
        let reading = false;

        document.addEventListener('keypress', (e) => {
            const processEnd = () => {
                if (code.length >= 6) {
                    setCurrentBarcode(code);
                    code = '';
                }
            };

            if (e.keyCode === 13) {
                processEnd();
            } else {
                code += e.key; //while this is not an 'enter' it stores the every key
            }

            //run a timeout of 200ms at the first read and clear everything
            if (!reading) {
                reading = true;
                setTimeout(() => {
                    code = '';
                    reading = false;
                }, 500);
            }
        });
    }, []);

    React.useEffect(() => {
        if (!currentBarcode) {
            return;
        }

        const timeout = setTimeout(() => setCurrentBarcode(null), 200);
        return () => clearTimeout(timeout);
    }, [currentBarcode]);

    return (
        <BarcodeContext.Provider
            value={{
                currentBarcode,
            }}
        >
            {children}
        </BarcodeContext.Provider>
    );
};

export default BarcodeScanner;
