import React, { useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface ImageUploadProps {
    onUpload: (file: File) => Promise<void>;
    onDelete?: () => Promise<void>;
    currentImageUrl?: string;
    type: 'profile' | 'listing';
    token: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload, onDelete, currentImageUrl, type, token }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file');
            return;
        }

        // Validate file size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
            setError('File size must be less than 10MB');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await onUpload(file);
        } catch (err) {
            setError('Failed to upload image');
            console.error('Upload error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!onDelete) return;

        setLoading(true);
        setError(null);

        try {
            await onDelete();
        } catch (err) {
            setError('Failed to delete image');
            console.error('Delete error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ textAlign: 'center', my: 2 }}>
            {currentImageUrl && (
                <Box sx={{ mb: 2 }}>
                    <img
                        src={currentImageUrl}
                        alt="Current"
                        style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
                    />
                </Box>
            )}

            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                type="file"
                onChange={handleFileChange}
                disabled={loading}
            />
            <label htmlFor="image-upload">
                <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    disabled={loading}
                >
                    Upload Image
                </Button>
            </label>

            {onDelete && currentImageUrl && (
                <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDelete}
                    disabled={loading}
                    sx={{ ml: 2 }}
                >
                    Delete Image
                </Button>
            )}

            {loading && <CircularProgress size={24} sx={{ ml: 2 }} />}
            {error && (
                <Typography color="error" sx={{ mt: 1 }}>
                    {error}
                </Typography>
            )}
        </Box>
    );
};

export default ImageUpload; 