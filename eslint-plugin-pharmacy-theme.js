/**
 * @fileoverview Custom ESLint plugin for enforcing pharmacy theme and documentation standards
 * @author React Native Training Course Team
 */

module.exports = {
  rules: {
    /**
     * Rule to enforce the use of medication terminology in component names
     */
    'use-medication-terminology': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Enforce the use of medication terminology in component names',
          category: 'Pharmacy Theme',
          recommended: true,
        },
        fixable: null,
        schema: [],
      },
      create: function(context) {
        const medicationTerms = [
          'medication', 'prescription', 'pharmacy', 'drug', 'dose', 'patient',
          'treatment', 'dispense', 'refill', 'order', 'inventory'
        ];
        
        return {
          ClassDeclaration(node) {
            if (node.id && node.id.name && node.id.name.includes('Component')) {
              const hasPharmacyTerm = medicationTerms.some(term => 
                node.id.name.toLowerCase().includes(term.toLowerCase())
              );
              
              if (!hasPharmacyTerm) {
                context.report({
                  node: node.id,
                  message: 'Component name should include pharmacy/medication terminology'
                });
              }
            }
          },
          
          VariableDeclarator(node) {
            if (node.init && 
                node.init.type === 'ArrowFunctionExpression' && 
                node.id.name && 
                (node.id.name.endsWith('Component') || 
                 node.id.name.match(/^[A-Z][a-zA-Z0-9]*$/))) {
              
              const hasPharmacyTerm = medicationTerms.some(term => 
                node.id.name.toLowerCase().includes(term.toLowerCase())
              );
              
              if (!hasPharmacyTerm) {
                context.report({
                  node: node.id,
                  message: 'Component name should include pharmacy/medication terminology'
                });
              }
            }
          }
        };
      }
    },
    
    /**
     * Rule to enforce consistent domain terminology in files
     */
    'consistent-domain-terms': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Enforce consistent domain terminology in files',
          category: 'Pharmacy Theme',
          recommended: true,
        },
        fixable: null,
        schema: [],
      },
      create: function(context) {
        const sourceCode = context.getSourceCode();
        const fileContent = sourceCode.getText();
        
        const pharmacyTerms = [
          'medication', 'prescription', 'pharmacy', 'drug', 'dose', 'patient',
          'treatment', 'dispense', 'refill', 'order', 'inventory'
        ];
        
        return {
          Program(node) {
            // Skip checking configuration files, test files, etc.
            if (context.getFilename().includes('config') || 
                context.getFilename().includes('test') ||
                context.getFilename().includes('setup') ||
                context.getFilename().includes('eslint')) {
              return;
            }
            
            const hasPharmacyTerm = pharmacyTerms.some(term => 
              fileContent.toLowerCase().includes(term.toLowerCase())
            );
            
            if (!hasPharmacyTerm && fileContent.includes('React')) {
              context.report({
                node,
                message: 'File should include pharmacy/medication terminology'
              });
            }
          }
        };
      }
    },
    
    /**
     * Rule to check for potential Articulate 360 compatibility issues
     */
    'articulate-compatibility': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Flag potential Articulate 360 compatibility issues',
          category: 'Documentation',
          recommended: true,
        },
        fixable: null,
        schema: [],
      },
      create: function(context) {
        const sourceCode = context.getSourceCode();
        const fileContent = sourceCode.getText();
        const filename = context.getFilename();
        
        // Only check markdown files in the docs directory
        if (!filename.endsWith('.md') || !filename.includes('docs')) {
          return {};
        }
        
        return {
          Program(node) {
            // Check for deeply nested headings (more than 3 levels)
            const headingLevels = fileContent.match(/^#{4,}\s/gm);
            if (headingLevels && headingLevels.length > 0) {
              context.report({
                node,
                message: 'Warning: Deeply nested headings (> H3) may be difficult to convert to Articulate slides'
              });
            }
            
            // Check for complex tables (more than 5 columns)
            const tableRows = fileContent.match(/\|.*\|/g);
            if (tableRows && tableRows.length > 0) {
              const maxColumns = Math.max(...tableRows.map(row => 
                (row.match(/\|/g) || []).length - 1
              ));
              
              if (maxColumns > 5) {
                context.report({
                  node,
                  message: 'Warning: Tables with more than 5 columns may be difficult to display in Articulate slides'
                });
              }
            }
            
            // Check for module README files that don't include Articulate implementation notes
            if (filename.includes('README.md') && 
                (filename.includes('module-') || filename.includes('section-'))) {
              if (!fileContent.includes('Articulate 360 Implementation Notes')) {
                context.report({
                  node,
                  message: 'Module documentation should include "Articulate 360 Implementation Notes" section'
                });
              }
            }
            
            // Check for embedded videos (which need to be externally hosted for Articulate)
            if (fileContent.includes('<video') || fileContent.includes('![](') && 
                (fileContent.includes('.mp4') || fileContent.includes('.webm'))) {
              context.report({
                node,
                message: 'Warning: Embedded videos should be hosted externally (YouTube/Vimeo) for Articulate compatibility'
              });
            }
          }
        };
      }
    }
  }
}; 