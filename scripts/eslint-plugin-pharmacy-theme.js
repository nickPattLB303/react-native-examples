/**
 * @fileoverview ESLint plugin for enforcing pharmacy theme terminology
 * @author React Native Training Course
 * @created 2023-02-27
 */

'use strict';

// Pharmacy theme terminology that should be used
const PHARMACY_TERMS = [
  'medication',
  'prescription',
  'pharmacy',
  'patient',
  'dosage',
  'inventory',
  'drug',
  'dispense',
  'refill',
  'order',
  'treatment'
];

/**
 * Checks if a string contains any of the pharmacy terms
 * @param {string} str - The string to check
 * @returns {boolean} True if the string contains a pharmacy term
 */
function containsPharmacyTerm(str) {
  return PHARMACY_TERMS.some(term => 
    str.includes(term) || 
    str.toLowerCase().includes(term)
  );
}

module.exports = {
  rules: {
    // Rule to enforce using medication terminology in component names
    'use-medication-terminology': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Enforce the use of pharmacy/medication terminology in component names',
          category: 'Stylistic Issues',
          recommended: true,
        },
        fixable: null,
        schema: [], // No options
      },
      create: function(context) {
        return {
          // Check component declarations (functional or class)
          'FunctionDeclaration, ClassDeclaration'(node) {
            // Skip if not in a JSX or TSX file
            const filename = context.getFilename();
            if (!filename.endsWith('.jsx') && !filename.endsWith('.tsx')) {
              return;
            }
            
            // Skip utility and configuration files
            if (filename.includes('config') || filename.includes('utils')) {
              return;
            }
            
            // Only check component names (usually PascalCase)
            const name = node.id.name;
            if (/^[A-Z]/.test(name)) {
              if (!containsPharmacyTerm(name)) {
                context.report({
                  node: node.id,
                  message: 'Component names should include pharmacy/medication terminology'
                });
              }
            }
          },
          
          // Check variable declarations that might be components
          'VariableDeclarator'(node) {
            // Skip if not in a JSX or TSX file
            const filename = context.getFilename();
            if (!filename.endsWith('.jsx') && !filename.endsWith('.tsx')) {
              return;
            }
            
            // Only check potential component names (usually PascalCase)
            const name = node.id.name;
            if (/^[A-Z]/.test(name)) {
              if (!containsPharmacyTerm(name)) {
                context.report({
                  node: node.id,
                  message: 'Component names should include pharmacy/medication terminology'
                });
              }
            }
          }
        };
      }
    },
    
    // Rule to ensure consistent domain terms are used
    'consistent-domain-terms': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Enforce consistent usage of domain terminology',
          category: 'Stylistic Issues',
          recommended: true,
        },
        fixable: null,
        schema: [], // No options
      },
      create: function(context) {
        return {
          // Check if the file contains any pharmacy terms
          'Program:exit'(node) {
            // Skip if not in a JS, JSX, TS, or TSX file
            const filename = context.getFilename();
            if (!filename.match(/\.(js|jsx|ts|tsx)$/)) {
              return;
            }
            
            // Skip utility and configuration files
            if (filename.includes('config') || filename.includes('utils')) {
              return;
            }
            
            // Skip if this is a test file
            if (filename.includes('test') || filename.includes('spec')) {
              return;
            }
            
            // Get the source code of the entire file
            const sourceCode = context.getSourceCode().getText();
            
            // Check if any pharmacy terms are used
            const hasPharmacyTerms = PHARMACY_TERMS.some(term => 
              sourceCode.includes(term) || 
              sourceCode.toLowerCase().includes(term)
            );
            
            // If the file contains React code but no pharmacy terms, report an error
            if (!hasPharmacyTerms && 
                (sourceCode.includes('React') || sourceCode.includes('import') && sourceCode.includes('react'))) {
              context.report({
                node,
                message: 'Files should include pharmacy/medication terminology consistent with the course theme'
              });
            }
          }
        };
      }
    }
  }
}; 