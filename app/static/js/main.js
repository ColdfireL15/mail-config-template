// Main JavaScript file for Flask Boilerplate

// Counter for spam detection per button
let clickCounters = {};

// Function to copy text to clipboard with anti-spam effect
function copyToClipboard(text) {
    // Get the clicked button
    const button = event.target;
    const buttonId = button.innerHTML + '_' + text; // Unique ID per button
    
    // Initialize counter if doesn't exist
    if (!clickCounters[buttonId]) {
        clickCounters[buttonId] = 0;
    }
    
    // Increment counter
    clickCounters[buttonId]++;
    
    // Apply progressive red effect based on click count
    applySpamEffect(button, clickCounters[buttonId]);
    
    // Actual copy functionality
    navigator.clipboard.writeText(text).then(function() {
        // Show feedback based on spam level
        showCopyFeedback(getFeedbackMessage(clickCounters[buttonId]));
    }, function(err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            showCopyFeedback(getFeedbackMessage(clickCounters[buttonId]));
        } catch (err) {
            showCopyFeedback('Failed to copy');
        }
        document.body.removeChild(textArea);
    });
    
    // Reset counter after 10 seconds of inactivity
    setTimeout(() => {
        if (clickCounters[buttonId] > 0) {
            clickCounters[buttonId] = Math.max(0, clickCounters[buttonId] - 1);
            if (clickCounters[buttonId] === 0) {
                resetButtonStyle(button);
            }
        }
    }, 10000);
}

// Function to apply progressive spam effect
function applySpamEffect(button, clickCount) {
    // Remove any existing spam classes
    button.classList.remove('spam-level-1', 'spam-level-2', 'spam-level-3', 'spam-level-4', 'spam-level-5');
    
    if (clickCount >= 15) {
        // Level 5: Full red + shake animation
        button.className = 'bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition-all duration-300 animate-pulse spam-level-5';
        button.style.animation = 'shake 0.5s ease-in-out';
    } else if (clickCount >= 12) {
        // Level 4: Dark red
        button.className = 'bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition-all duration-300 spam-level-4';
    } else if (clickCount >= 9) {
        // Level 3: Medium red
        button.className = 'bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition-all duration-300 spam-level-3';
    } else if (clickCount >= 6) {
        // Level 2: Light red
        button.className = 'bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded text-xs transition-all duration-300 spam-level-2';
    } else if (clickCount >= 3) {
        // Level 1: Orange warning
        button.className = 'bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs transition-all duration-300 spam-level-1';
    }
}

// Function to reset button to original style
function resetButtonStyle(button) {
    button.className = 'bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs transition-colors';
    button.style.animation = '';
}

// Function to get feedback message based on spam level
function getFeedbackMessage(clickCount) {
    if (clickCount >= 15) {
        return '🔥 STOP SPAMMING! 🔥';
    } else if (clickCount >= 12) {
        return '😠 Seriously, stop it!';
    } else if (clickCount >= 9) {
        return '😤 Hey, calm down!';
    } else if (clickCount >= 6) {
        return '🤔 Do you really need to copy this again?';
    } else if (clickCount >= 3) {
        return '⚠️ Maybe you copied enough?';
    } else {
        return 'Copied to clipboard!';
    }
}

// Function to show copy feedback
function showCopyFeedback(message) {
    // Create or update feedback element
    let feedback = document.getElementById('copy-feedback');
    if (!feedback) {
        feedback = document.createElement('div');
        feedback.id = 'copy-feedback';
        document.body.appendChild(feedback);
    }
    
    // Style based on message type
    if (message.includes('STOP') || message.includes('🔥')) {
        feedback.className = 'fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded shadow-lg z-50 transition-opacity duration-300 animate-bounce';
    } else if (message.includes('😠') || message.includes('😤')) {
        feedback.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50 transition-opacity duration-300';
    } else if (message.includes('⚠️') || message.includes('🤔')) {
        feedback.className = 'fixed top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded shadow-lg z-50 transition-opacity duration-300';
    } else {
        feedback.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 transition-opacity duration-300';
    }
    
    feedback.textContent = message;
    feedback.style.opacity = '1';
    
    // Hide after varying duration based on spam level
    const hideDelay = message.includes('STOP') ? 4000 : 2000;
    setTimeout(() => {
        feedback.style.opacity = '0';
    }, hideDelay);
}

// Add shake animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);