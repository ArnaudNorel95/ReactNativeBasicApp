import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { User } from '../types';
import { useNavigation } from '@react-navigation/native';

export default function UserScreen() : React.ReactElement {
    const [users, setUsers] = useState<User[]>([])
    const navigation = useNavigation<any>()

    useEffect(() => {
        const fetchUsers = async () => {
            // TODO put in store REDUX or ZUSTAND
            const apiUrl = "http://localhost:3000";
            const url = `${apiUrl}/users`;

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                });
                const usersData = await response.json();
                setUsers(usersData);

            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
    
        fetchUsers();
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Users</Text>
            <FlatList
                data={users}
                keyExtractor={(user) => user.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card} >
                        <Text style={styles.name}>{item.id}- {item.first_name} {item.last_name}</Text>
                        <Text style={styles.username}>@{item.username}</Text>
                        <Button title="Notes" onPress={() => navigation.navigate('Notes', {userId: item.id})} />
                    </View>
                )}
            />
        </View>
    );
};

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
        elevation: 3, // Shadow for Android
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
        color: '#444',
    },
    username: {
        fontSize: 16,
        color: '#777',
    },
});