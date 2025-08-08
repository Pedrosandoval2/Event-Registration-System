import React, { useEffect } from 'react';
import { Html5QrcodeCameraScanConfig, Html5QrcodeFullConfig, Html5QrcodeScanner, QrcodeErrorCallback, QrcodeSuccessCallback, } from 'html5-qrcode';

const qrcodeRegionId = "html5qr-code-full-region";

interface ConfigProps extends Html5QrcodeCameraScanConfig, Pick<Html5QrcodeFullConfig, 'verbose'> {
    qrCodeSuccessCallback: QrcodeSuccessCallback;
    qrCodeErrorCallback?: QrcodeErrorCallback;
}

const createConfig = (props: Html5QrcodeCameraScanConfig) => {
    let config: Html5QrcodeCameraScanConfig = { fps: undefined };
    if (props.fps) {
        config.fps = props.fps;
    }
    if (props.qrbox) {
        config.qrbox = props.qrbox;
    }
    if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
    }
    if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip;
    }
    return config;
};

export const QrScanner = (props?: ConfigProps) => {

    useEffect(() => {
        if (!props) return;
        const config = createConfig(props);

        const verbose = props.verbose === true

        if (!(props.qrCodeSuccessCallback)) {
            throw "qrCodeSuccessCallback is required callback.";
        }

        const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
        html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);

        return () => {
            html5QrcodeScanner.clear().catch(error => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div id={qrcodeRegionId} style={{ width: '100%', maxWidth: '600px' }}></div>
    );
};