// Image Modal Preview & Download
document.addEventListener('DOMContentLoaded', function() {
    const searchResult = document.getElementById('search-result');
    const modal = document.createElement('div');
    modal.id = 'image-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: none;
        z-index: 1000;
        justify-content: center;
        align-items: center;
    `;
    document.body.appendChild(modal);

    // Modal content template
    const modalContent = `
        <button id="modal-close" style="position: absolute; top: 20px; right: 30px; background: none; border: none; color: white; font-size: 30px; cursor: pointer;">&times;</button>
        <div style="max-width: 90%; max-height: 90%; position: relative;">
            <img id="modal-image" style="max-width: 100%; max-height: 100%; object-fit: contain;">
            <div style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.7); color: white; padding: 10px 20px; border-radius: 25px;">
                <button id="download-btn" style="background: #6366f1; color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer; margin-right: 10px;"><i class="fas fa-download"></i> Download</button>
                <button id="save-history-btn" style="background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer;"><i class="fas fa-save"></i> Save to History</button>
            </div>
        </div>
    `;
    modal.innerHTML = modalContent;

    const closeBtn = document.getElementById('modal-close');
    const modalImage = document.getElementById('modal-image');
    const downloadBtn = document.getElementById('download-btn');
    const saveHistoryBtn = document.getElementById('save-history-btn');

    closeBtn.onclick = () => modal.style.display = 'none';

    window.onclick = (event) => {
        if (event.target === modal) modal.style.display = 'none';
    };

    // Listen for dynamically added images
    const observer = new MutationObserver(() => {
        const images = searchResult.querySelectorAll('img');
        images.forEach(img => {
            if (!img.dataset.modalized) {
                img.style.cursor = 'zoom-in';
                img.dataset.modalized = 'true';
                img.onclick = () => {
                    modal.style.display = 'flex';
                    modalImage.src = img.src.replace('/small', '/regular');
                    modalImage.dataset.fullUrl = img.closest('.image-box').querySelector('a').href;
                    modalImage.dataset.alt = img.alt;
                };
            }
        });
    });
    observer.observe(searchResult, { childList: true, subtree: true });
});

document.addEventListener('click', function(e) {
    if (e.target.id === 'download-btn') {
        const img = document.getElementById('modal-image');
        const a = document.createElement('a');
        a.href = img.src;
        a.download = img.dataset.alt || 'image.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } else if (e.target.id === 'save-history-btn') {
        const img = document.getElementById('modal-image');
        const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        history.unshift({
            url: img.dataset.fullUrl,
            thumb: img.src,
            alt: img.dataset.alt,
            date: new Date().toISOString()
        });
        localStorage.setItem('searchHistory', JSON.stringify(history.slice(0, 50))); // Keep last 50
        alert('Saved to history!');
    }
});