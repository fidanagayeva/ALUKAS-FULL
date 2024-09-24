'use client';

import { useState, useEffect } from 'react';
import { FiTrash, FiEdit, FiEye, FiMenu, FiX } from 'react-icons/fi';

const Admin = () => {
    const [data, setData] = useState([]);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [viewingItem, setViewingItem] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/trendy');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3001/api/trendy/${id}`, {
                method: 'DELETE',
            });
            const updatedData = data.filter(item => item._id !== id);
            setData(updatedData);
        } catch (error) {
            console.error("Error deleting data:", error);
        }
        setSidebarOpen(false);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const newItem = {
            id: editingItem ? editingItem._id : data.length + 1,
            name: formData.get('name'),
            brand: formData.get('brand'),
            price: parseFloat(formData.get('price')),
            oldPrice: formData.get('oldPrice') ? parseFloat(formData.get('oldPrice')) : null,
            label: formData.get('label'),
            description: formData.get('description'),
            image1: formData.get('image1').size === 0 ? editingItem?.image1 : URL.createObjectURL(formData.get('image1')),
            image2: formData.get('image2').size === 0 ? editingItem?.image2 : URL.createObjectURL(formData.get('image2')),
        };

        try {
            if (editingItem) {
                await fetch(`http://localhost:3001/api/trendy/${editingItem._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newItem),
                });
                const updatedData = data.map(item => item._id === editingItem._id ? newItem : item);
                setData(updatedData);
            } else {
                const response = await fetch('http://localhost:3001/api/trendy', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newItem),
                });
                const result = await response.json();
                setData([...data, result]);
            }
        } catch (error) {
            console.error("Error saving data:", error);
        }
        setSidebarOpen(false);
    };

    const handleEdit = (item) => {
        setEditingItem(item); 
        setViewingItem(null);
        setIsDeleting(false);
        setSidebarOpen(true);
    };

    const handleView = (item) => {
        setViewingItem(item);
        setEditingItem(null);
        setIsDeleting(false);
        setSidebarOpen(true);
    };

    const handleDeleteConfirmation = (item) => {
        setViewingItem(item);
        setEditingItem(null);
        setIsDeleting(true);
        setSidebarOpen(true);
    };

    const handleAddNew = () => {
        setEditingItem(null);
        setViewingItem(null);
        setIsDeleting(false);
        setSidebarOpen(true);
    };

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.brand && item.brand.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) 
    );

    return (
        <div className="flex">
            <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 bg-gray-800 p-6 w-80 z-50 overflow-y-auto max-h-screen scrollbar-custom`}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white text-lg">
                        {isDeleting ? 'Delete' : editingItem ? 'Edit' : viewingItem ? 'View' : 'Add'}
                    </h2>
                    <button onClick={() => setSidebarOpen(false)} className="text-white">
                        <FiX size={24} />
                    </button>
                </div>

                {viewingItem && !isDeleting && (
                    <div className="text-white space-y-4">
                        <img src={viewingItem.image1} alt={viewingItem.name} className="w-full h-auto" />
                        <p>Name: {viewingItem.name}</p>
                        <p>Brand: {viewingItem.brand}</p>
                        <p>Price: ${viewingItem.price}</p>
                        <p>Old Price: ${viewingItem.oldPrice}</p>
                        <p>Label: {viewingItem.label}</p>
                        <p>Description: {viewingItem.description}</p>
                    </div>
                )}

                {!viewingItem && (
                    <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
                        <input name="name" placeholder="Name" defaultValue={editingItem?.name} className="p-2 rounded bg-gray-700 text-white" required />
                        <input name="brand" placeholder="Brand" defaultValue={editingItem?.brand} className="p-2 rounded bg-gray-700 text-white" required />
                        <input name="price" placeholder="Price" defaultValue={editingItem?.price} type="number" min="1" className="p-2 rounded bg-gray-700 text-white" required />
                        <input name="oldPrice" placeholder="Old Price" defaultValue={editingItem?.oldPrice} type="number" min="1" className="p-2 rounded bg-gray-700 text-white" />
                        <input name="label" placeholder="Label" defaultValue={editingItem?.label} className="p-2 rounded bg-gray-700 text-white" />
                        <textarea name="description" placeholder="Description" defaultValue={editingItem?.description} className="p-2 rounded bg-gray-700 text-white"></textarea>
                        <label className="text-white">Upload Image 1:</label>
                        {editingItem?.image1 && <img src={editingItem.image1} alt="image1" className="w-full h-12 mb-2 object-cover" />}
                        <input name="image1" type="file" className="p-2 rounded bg-gray-700 text-white" />
                        <label className="text-white">Upload Image 2:</label>
                        {editingItem?.image2 && <img src={editingItem.image2} alt="image2" className="w-full h-12 mb-2 object-cover" />}
                        <input name="image2" type="file" className="p-2 rounded bg-gray-700 text-white" />
                        <button type="submit" className="p-2 rounded bg-blue-500 text-white">
                            {editingItem ? 'Update' : 'Add'}
                        </button>
                    </form>
                )}

                {isDeleting && viewingItem && (
                    <div className="text-white space-y-4">
                        <p>Are you sure you want to delete <strong>{viewingItem.name}</strong>?</p>
                        <button onClick={() => handleDelete(viewingItem._id)} className="mt-4 p-2 rounded bg-red-500 text-white w-full">
                            Confirm Delete
                        </button>
                    </div>
                )}
            </div>

            <div className="w-full p-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-2">
                        <FiMenu className="text-gray-700" />
                        <span onClick={handleAddNew} className="cursor-pointer text-gray-700">Create</span>
                    </div>
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="p-2 border border-gray-300"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto mb-10">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 border-b text-left">Image</th>
                                <th className="p-2 border-b text-left">Name</th>
                                <th className="p-2 border-b text-left">Brand</th>
                                <th className="p-2 border-b text-left">Price</th>
                                <th className="p-2 border-b text-left">Old Price</th>
                                <th className="p-2 border-b text-left">Label</th>
                                <th className="p-2 border-b text-left">Description</th>
                                <th className="p-2 border-b text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map(item => (
                                <tr key={item._id} className="border-b">
                                    <td className="p-2"><img src={item.image1} alt={item.name} className="h-12 w-12 object-cover" /></td>
                                    <td className="p-2">{item.name}</td>
                                    <td className="p-2">{item.brand}</td>
                                    <td className="p-2">${item.price}</td>
                                    <td className="p-2">${item.oldPrice || 'N/A'}</td>
                                    <td className="p-2">{item.label || 'No Label'}</td>
                                    <td className="p-2">{item.description || 'No Description'}</td>
                                    <td className="p-2 flex justify-center space-x-4">
                                        <button onClick={() => handleView(item)} className="text-gray-500"><FiEye /></button>
                                        <button onClick={() => handleEdit(item)} className="text-blue-500"><FiEdit /></button>
                                        <button onClick={() => handleDeleteConfirmation(item)} className="text-red-500"><FiTrash /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Admin;
