import { db } from '../config/firebase';
import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  QueryConstraint
} from 'firebase/firestore';
import type { WhereFilterOp } from 'firebase/firestore';

export interface FirestoreDocument {
  id: string;
  [key: string]: unknown;
}

export interface QueryCondition {
  field: string;
  operator: WhereFilterOp;
  value: unknown;
}

class FirestoreService {
  // Add a document to a collection
  async addDocument(collectionName: string, data: Record<string, unknown>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding document:', error);
      throw error;
    }
  }

  // Get a document by ID
  async getDocument(collectionName: string, docId: string): Promise<FirestoreDocument | null> {
    try {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting document:', error);
      throw error;
    }
  }

  // Get all documents from a collection
  async getDocuments(collectionName: string): Promise<FirestoreDocument[]> {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting documents:', error);
      throw error;
    }
  }

  // Update a document
  async updateDocument(collectionName: string, docId: string, data: Record<string, unknown>): Promise<void> {
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  }

  // Delete a document
  async deleteDocument(collectionName: string, docId: string): Promise<void> {
    try {
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  }

  // Query documents with conditions
  async queryDocuments(
    collectionName: string,
    conditions: QueryCondition[] = [],
    orderByField?: string,
    orderDirection: 'asc' | 'desc' = 'asc',
    limitCount?: number
  ): Promise<FirestoreDocument[]> {
    try {
      const q = collection(db, collectionName);
      const queryConstraints: QueryConstraint[] = [];

      // Add where conditions
      conditions.forEach(condition => {
        queryConstraints.push(where(condition.field, condition.operator, condition.value));
      });

      // Add order by
      if (orderByField) {
        queryConstraints.push(orderBy(orderByField, orderDirection));
      }

      // Add limit
      if (limitCount) {
        queryConstraints.push(limit(limitCount));
      }

      const finalQuery = query(q, ...queryConstraints);
      const querySnapshot = await getDocs(finalQuery);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error querying documents:', error);
      throw error;
    }
  }
}

export const firestoreService = new FirestoreService();
