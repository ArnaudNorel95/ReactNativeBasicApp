import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Modal} from 'react-native';
import { Note } from '../types';


export default function NoteScreen({route}: any) : React.ReactElement {
    const [notes, setNotes] = useState<Note[]>([])
    const [editingNote, setEditingNote] = useState<Note | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            // TODO put in store REDUX or ZUSTAND
            const apiUrl = "http://localhost:3000";
            const url = `${apiUrl}/note?userId=${route.params.userId}`;

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                });
                
                const notesData = await response.json();
                setNotes(notesData);

            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
    
        fetchUsers();
    }, []);

    // Display a Modal to allow user editing 
    const handleEditNote = (note: Note) => {
        setEditingNote(note);
        setModalVisible(true);
    };

    // PATCH request to API
    const saveEditedNote = async () => {
        if (!editingNote) return;

        try {
            const apiUrl = "http://localhost:3000";
            const url = `${apiUrl}/note/${editingNote.id}`;

            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: editingNote.title,
                    content: editingNote.content
                })
            });

            if (response.ok) {
                setNotes(notes.map(note => 
                    note.id === editingNote.id ? editingNote : note
                ));
                setModalVisible(false);
                setEditingNote(null);
            }
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    const renderNoteCard = ({ item }: { item: Note }) => (
        <View style={styles.card}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteContent}>{item.content}</Text>
            <Text style={styles.noteMetadata}>
                edited on {new Date(item.updatedAt).toLocaleString()}
            </Text>
            <TouchableOpacity 
                style={styles.editButton} 
                onPress={() => handleEditNote(item)}
            >
                <Text style={styles.editButtonText}>Edit Note</Text>
            </TouchableOpacity>
        </View>
    );

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Notes of User </Text>
            <FlatList
                data={notes}
                keyExtractor={(note) => note.id.toString()}
                renderItem={renderNoteCard}
                ListEmptyComponent={<Text> No notes found </Text>}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Note</Text>
                        <TextInput
                            style={styles.modalInput}
                            value={editingNote?.title}
                            onChangeText={(text) => setEditingNote(prev => 
                                prev ? {...prev, title: text} : null
                            )}
                            placeholder="Note Title"
                        />
                        <TextInput
                            style={[styles.modalInput, styles.modalTextArea]}
                            value={editingNote?.content}
                            onChangeText={(text) => setEditingNote(prev => 
                                prev ? {...prev, content: text} : null
                            )}
                            placeholder="Note Content"
                            multiline
                        />
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity 
                                style={styles.modalButton} 
                                onPress={saveEditedNote}
                            >
                                <Text style={styles.modalButtonText}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.modalButton, styles.modalCancelButton]} 
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f4f8',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    noteTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2c3e50',
    },
    noteContent: {
        fontSize: 16,
        color: '#34495e',
        marginBottom: 10,
    },
    noteMetadata: {
        fontSize: 12,
        color: '#7f8c8d',
        fontStyle: 'italic',
        marginBottom: 10,
    },
    editButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    editButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    emptyListText: {
        textAlign: 'center',
        color: '#7f8c8d',
        marginTop: 50,
        fontSize: 18,
    },
    // Modal Styles
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2c3e50',
    },
    modalInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#bdc3c7',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    modalTextArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        backgroundColor: '#3498db',
        padding: 12,
        borderRadius: 5,
        width: '48%',
        alignItems: 'center',
    },
    modalCancelButton: {
        backgroundColor: '#e74c3c',
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});