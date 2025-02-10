# Custom Hooks Implementation
⏱️ Duration: 15 minutes

## Setup Notes
- ProductCard.tsx file open with previous implementations
- New hooks directory ready
- TypeScript playground for type demonstrations
- Platform-specific examples prepared
- Common custom hooks patterns diagram ready

## Verbal Script

[Create new directory]

"Now comes the really exciting part - creating our own custom hooks. This is where React's true power shines: the ability to compose and reuse stateful logic.

[Create new file hooks/useFavoriteProduct.ts]

First, let's extract our favorite functionality into its own hook. This pattern will be familiar to:
- iOS developers who create reusable manager classes
- Android developers who create shared ViewModels

```typescript
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UseFavoriteProductResult {
  isFavorite: boolean;
  setIsFavorite: (value: boolean) => void;
  isLoading: boolean;
  error: Error | null;
}

export const useFavoriteProduct = (productId: string): UseFavoriteProductResult => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
}

[Point to interface]

Notice how we're using TypeScript to define exactly what this hook returns. This gives us excellent autocompletion and type safety.

[Continue typing]

```typescript
  // Load initial state
  useEffect(() => {
    const loadFavoriteState = async () => {
      try {
        setIsLoading(true);
        const stored = await AsyncStorage.getItem(`favorite_${productId}`);
        if (stored !== null) {
          setIsFavorite(JSON.parse(stored));
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load favorite state'));
      } finally {
        setIsLoading(false);
      }
    };

    loadFavoriteState();
  }, [productId]);

  // Save state changes
  useEffect(() => {
    const saveFavoriteState = async () => {
      try {
        await AsyncStorage.setItem(`favorite_${productId}`, JSON.stringify(isFavorite));
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to save favorite state'));
      }
    };

    if (!isLoading) {
      saveFavoriteState();
    }
  }, [isFavorite, productId, isLoading]);

  return { isFavorite, setIsFavorite, isLoading, error };
};
```

[Point out key aspects]

Let's break down what makes this a great custom hook:
1. Follows the 'use' naming convention
2. Composes multiple React hooks
3. Handles loading and error states
4. Returns a clean interface
5. Encapsulates all AsyncStorage logic

[Create new file hooks/useProductAnimation.ts]

Now let's extract our animation logic:

```typescript
import { useState, useEffect } from 'react';
import { Animated, Platform } from 'react-native';

interface UseProductAnimationResult {
  fadeAnim: Animated.Value;
  expandAnim: Animated.Value;
  containerStyle: {
    opacity: Animated.Value;
    maxHeight: Animated.AnimatedInterpolation;
  };
}

export const useProductAnimation = (isExpanded: boolean): UseProductAnimationResult => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [expandAnim] = useState(new Animated.Value(0));

  // Initial fade-in
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Handle expand/collapse
  useEffect(() => {
    Animated.spring(expandAnim, {
      toValue: isExpanded ? 1 : 0,
      useNativeDriver: false,
      friction: 8,
      tension: 40,
    }).start();
  }, [isExpanded]);

  const containerStyle = {
    opacity: fadeAnim,
    maxHeight: expandAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 300], // Adjust these values based on your content
    }),
  };

  return { fadeAnim, expandAnim, containerStyle };
};
```

[Point out platform-specific handling]

Notice how we're handling platform-specific animations:
- useNativeDriver where supported
- Appropriate spring configuration for each platform
- Proper cleanup of animations

[Create hooks/useProductAnalytics.ts]

One more hook for analytics:

```typescript
interface UseProductAnalyticsResult {
  logView: () => void;
  logFavorite: (isFavorite: boolean) => void;
  logPurchase: (quantity: number) => void;
}

export const useProductAnalytics = (productId: string): UseProductAnalyticsResult => {
  useEffect(() => {
    const startTime = Date.now();
    
    return () => {
      const duration = Date.now() - startTime;
      console.log(`Product ${productId} viewed for ${duration}ms`);
      // In real app: analytics.logEvent('product_view_duration', { productId, duration });
    };
  }, [productId]);

  const logView = useCallback(() => {
    console.log(`Product ${productId} viewed`);
    // In real app: analytics.logEvent('product_view', { productId });
  }, [productId]);

  const logFavorite = useCallback((isFavorite: boolean) => {
    console.log(`Product ${productId} ${isFavorite ? 'favorited' : 'unfavorited'}`);
    // In real app: analytics.logEvent('product_favorite', { productId, isFavorite });
  }, [productId]);

  const logPurchase = useCallback((quantity: number) => {
    console.log(`Product ${productId} purchased, quantity: ${quantity}`);
    // In real app: analytics.logEvent('product_purchase', { productId, quantity });
  }, [productId]);

  return { logView, logFavorite, logPurchase };
};
```

[Show updated ProductCard.tsx]

Now let's see how clean our component becomes:

```typescript
export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  description,
  imageUrl,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  const { isFavorite, setIsFavorite, isLoading } = useFavoriteProduct(id);
  const { containerStyle } = useProductAnimation(isExpanded);
  const { logView, logFavorite, logPurchase } = useProductAnalytics(id);

  // Component is now focused on layout and user interaction
  return (
    <Container style={containerStyle}>
      {/* JSX here */}
    </Container>
  );
};
```

[Point out the transformation]

See how much cleaner this is? Our component is now focused on:
- Layout structure
- User interactions
- Visual composition

All the complex logic is hidden away in reusable hooks.

[Show custom hooks best practices diagram]

Let's review some custom hooks best practices:

1. Naming Conventions:
```typescript
// ❌ Bad
const useMyHook = () => {};

// ✅ Good
const useProductAnimation = () => {};
const useShoppingCart = () => {};
```

2. Return Types:
```typescript
// ❌ Unclear return type
const useData = () => ({ /* ... */ });

// ✅ Clear interface
interface UseDataResult {
  data: Data | null;
  isLoading: boolean;
  error: Error | null;
}
const useData = (): UseDataResult => ({ /* ... */ });
```

3. Error Handling:
```typescript
// ❌ Silent failures
const useFetch = () => {
  fetch(url).catch(() => {});
};

// ✅ Proper error handling
const useFetch = () => {
  const [error, setError] = useState<Error | null>(null);
  // Handle and expose errors
};
```

Any questions about custom hooks before we wrap up?

[Pause for questions]

## Visual Aids
- Custom hooks patterns diagram (assets/diagrams/custom-hooks-patterns.png)
- Component transformation comparison (assets/diagrams/component-transformation.png)
- Best practices checklist (assets/diagrams/hooks-best-practices.png)

## Code Examples
See code-snippets/typescript/custom-hooks-examples.ts for all code shown in this section.

## Checkpoints
- [ ] Custom hooks concept explained
- [ ] Favorite functionality extracted
- [ ] Animation logic separated
- [ ] Analytics implementation shown
- [ ] Best practices covered
- [ ] Component transformation demonstrated

## Transition Notes
- Move to Q&A session
- Prepare common questions and answers
- Have additional examples ready
- Energy should encourage final questions 