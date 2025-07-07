import React, { useState } from 'react';
import { qrService } from '../services/qrService';

const QRGenerate = () => {
    const [qrData, setQrData] = useState('');
    const [qrCode, setQrCode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const qrCodeData = await qrService.generateQR(qrData);
            setQrCode(qrCodeData);
        } catch (error) {
            console.error('Error generating QR:', error);
            alert('Error al generar el código QR');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setQrData(e.target.value);
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h5>Generar Código QR</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="qrData" className="form-label">Datos para el QR</label>
                                    <textarea
                                        className="form-control"
                                        id="qrData"
                                        name="qrData"
                                        rows="3"
                                        value={qrData}
                                        onChange={handleChange}
                                        placeholder="Ingrese los datos que desea codificar en el QR"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={loading || !qrData.trim()}
                                >
                                    {loading ? 'Generando...' : 'Generar QR'}
                                </button>
                            </form>

                            {qrCode && (
                                <div className="mt-4 text-center">
                                    <h6>Código QR Generado:</h6>
                                    <div className="d-flex justify-content-center">
                                        <img 
                                            src={`data:image/png;base64,${qrCode}`} 
                                            alt="Código QR"
                                            className="img-fluid"
                                            style={{ maxWidth: '300px' }}
                                        />
                                    </div>
                                    <div className="mt-3">
                                        <a
                                            href={`data:image/png;base64,${qrCode}`}
                                            download="qr-code.png"
                                            className="btn btn-outline-primary"
                                        >
                                            Descargar QR
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRGenerate;
