import type { Project } from '../types';

const PROJECTS_DATA: Project[] = [
  {
    id: 'python-module-01',
  name: 'Python Module 01',
  tier: 1,
  maxScore: 100,
  sections: [
    // CRITICAL SECTION - Must pass both to continue
    {
      type: 'mandatory',
      title: 'Preliminaries',
      weight: 0,
      items: [
        {
          id: 'basics',
          label: 'All required files present and correctly named (ex0-ex6)',
          description: 'Files: ft_garden_intro.py, ft_garden_data.py, ft_plant_growth.py, ft_plant_factory.py, ft_garden_security.py, ft_plant_types.py, ft_garden_analytics.py'
        },
        {
          id: 'general-instructions',
          label: 'Code meets general standards (Python 3.10+, flake8, naming conventions, docstrings)',
          description: 'Python 3.10+, flake8 compliance, proper naming, docstrings present, programs run without errors'
        }
      ]
    },
    
    // MANDATORY SECTION - Each exercise worth points
    {
      type: 'mandatory',
      title: 'Exercise 0 - Program Structure',
      weight: 14.3, // ~100/7 exercises
      items: [
        {
          id: 'ex0-main-pattern',
          label: 'Uses if __name__ == "__main__": pattern correctly',
          scale: 5
        },
        {
          id: 'ex0-variables',
          label: 'Plant information stored in simple variables',
          scale: 5
        },
        {
          id: 'ex0-display',
          label: 'Displays information using print() with good formatting',
          scale: 5
        },
        {
          id: 'ex0-understanding',
          label: 'Can explain what __name__ == "__main__" means and why it\'s important',
          scale: 5
        }
      ]
    },
    
    {
      type: 'mandatory',
      title: 'Exercise 1 - Classes (Data Organization)',
      weight: 14.3,
      items: [
        {
          id: 'ex1-class-definition',
          label: 'Class defined with proper syntax',
          scale: 5
        },
        {
          id: 'ex1-instantiation',
          label: 'Object instantiation (creating instances) works correctly',
          scale: 5
        },
        {
          id: 'ex1-attributes',
          label: 'Basic attributes (plant properties) are used',
          scale: 5
        },
        {
          id: 'ex1-understanding',
          label: 'Can explain what a class is and why they used it',
          scale: 5
        }
      ]
    },
    
    {
      type: 'mandatory',
      title: 'Exercise 2 - Methods (Actions)',
      weight: 14.3,
      items: [
        {
          id: 'ex2-method-definition',
          label: 'Methods defined within classes correctly',
          scale: 5
        },
        {
          id: 'ex2-method-calls',
          label: 'Method calls on object instances work',
          scale: 5
        },
        {
          id: 'ex2-state-changes',
          label: 'State changes through method execution (growth, aging)',
          scale: 5
        },
        {
          id: 'ex2-simulation',
          label: 'Simulation shows progression over time',
          scale: 5
        }
      ]
    },
    
    {
      type: 'mandatory',
      title: 'Exercise 3 - Initialization (__init__)',
      weight: 14.3,
      items: [
        {
          id: 'ex3-init-method',
          label: '__init__ method defined and used correctly',
          scale: 5
        },
        {
          id: 'ex3-parameters',
          label: 'Parameter passing during object creation works',
          scale: 5
        },
        {
          id: 'ex3-initial-state',
          label: 'Initial state setting for new objects',
          scale: 5
        },
        {
          id: 'ex3-factory-pattern',
          label: 'Multiple plants created with different initial values',
          scale: 5
        }
      ]
    },
    
    {
      type: 'mandatory',
      title: 'Exercise 4 - Encapsulation (Data Protection)',
      weight: 14.3,
      items: [
        {
          id: 'ex4-protected-attrs',
          label: 'Protected attributes (using underscore convention)',
          scale: 5
        },
        {
          id: 'ex4-getters-setters',
          label: 'Getter and setter methods for controlled access',
          scale: 5
        },
        {
          id: 'ex4-validation',
          label: 'Data validation before allowing changes (rejects invalid data)',
          scale: 5
        },
        {
          id: 'ex4-integrity',
          label: 'Plant data integrity is maintained',
          scale: 5
        }
      ]
    },
    
    {
      type: 'mandatory',
      title: 'Exercise 5 - Inheritance (Specialized Types)',
      weight: 14.3,
      items: [
        {
          id: 'ex5-base-class',
          label: 'Base class (Plant) with common features',
          scale: 5
        },
        {
          id: 'ex5-derived-classes',
          label: 'Derived classes (Flower, Tree, Vegetable) with specialized features',
          scale: 5
        },
        {
          id: 'ex5-super-calls',
          label: 'super() calls to parent class methods',
          scale: 5
        },
        {
          id: 'ex5-overriding',
          label: 'Method overriding for specialized behavior',
          scale: 5
        }
      ]
    },
    
    {
      type: 'mandatory',
      title: 'Exercise 6 - Advanced OOP',
      weight: 14.2, // Adjusted to total exactly 100
      items: [
        {
          id: 'ex6-nested-classes',
          label: 'Nested classes (class within a class) work correctly',
          scale: 5
        },
        {
          id: 'ex6-inheritance-chain',
          label: 'Inheritance chains (A → B → C) with proper super() usage',
          scale: 5
        },
        {
          id: 'ex6-class-methods',
          label: 'Class methods using @classmethod decorator',
          scale: 5
        },
        {
          id: 'ex6-static-methods',
          label: 'Static methods using @staticmethod and non-member functions',
          scale: 5
        }
      ]
    }
  ]
  }
];

export default PROJECTS_DATA;