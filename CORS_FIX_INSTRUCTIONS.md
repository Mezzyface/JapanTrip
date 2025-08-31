# Japan Trip Website - Running Instructions

## Quick Fix for CORS Issues

Your website is experiencing CORS (Cross-Origin Resource Sharing) issues when loading JSON files via the `file://` protocol. Here are several solutions:

### Option 1: Enable PowerShell Scripts and Run Local Server (Recommended)

1. **Enable PowerShell script execution** (run as Administrator):
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

2. **Run the simple server**:
   ```powershell
   cd C:\JapanTrip
   .\simple-server.ps1
   ```

3. **Open the website** at: `http://localhost:3000`

### Option 2: Use Python Simple Server (if Python is installed)

1. **Install Python** from the Microsoft Store if not already installed
2. **Run the server**:
   ```powershell
   cd C:\JapanTrip
   python -m http.server 8080
   ```
3. **Open the website** at: `http://localhost:8080`

### Option 3: Fallback Data (Currently Active)

The website now includes fallback data that works with the `file://` protocol. It will:
- Try to load JSON files normally
- If CORS blocks the request, use embedded backup data
- Show real itinerary data for Days 0-2 and template data for remaining days

### Current Status

✅ **Fixed Issues:**
- Day 0 template function now correctly handles November 25, 2025
- Header updated to show 17 days total
- JSON comment headers removed from key files
- Fallback data system implemented for CORS issues

✅ **Website Features Working:**
- Beautiful timeline layout with Japanese-inspired design
- Interactive day cards with hover effects
- Statistics showing total cities and activities
- All 17 days (Day 0 through Day 16) loading

### Next Steps

1. **Run a local server** (Option 1 or 2 above) for the best experience
2. **All JSON files will load properly** when served via HTTP instead of file://
3. **Continue updating JSON files** with your real itinerary data

### Troubleshooting

If you see placeholder data on the website:
- Check the browser console for error messages
- Try running a local server using one of the options above
- The fallback system will ensure basic functionality even with CORS issues

The website is now functional with fallback data, but running a local server will give you the full experience with all your real itinerary data!
