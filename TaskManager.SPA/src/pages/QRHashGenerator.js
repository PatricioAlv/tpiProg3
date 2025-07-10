import { View, Text } from 'react-native'
import React from 'react'

const QRHashGenerator = () => {
  return (
    app.post('/api/qr/generate', (req, res) => {
        // Generás un hash único, por ejemplo:
        const hash = crypto.randomUUID(); // o cualquier generador
    
        // Guardás el hash si querés validar después...
        qrDatabase[hash] = {
            feature: 'exclusive_access',
            createdAt: Date.now()
        };
    
        res.json({ hash }); // 👈 Asegurate de que retorne este formato
    })
    
  )
}

export default QRHashGenerator